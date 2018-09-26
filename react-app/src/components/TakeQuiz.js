import React, { Component } from 'react';
import './TakeQuiz.css'
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class TakeQuizLink extends Component {
    constructor() {
        super();
        this.state = {
          requestData: {
            PlayerID: 0,
            PlayerName: "",
            QuizName: "",
            QuizID: 0,
            Score: 0,
          },
          data: [],
          questionNumber : 0,
          Score: 0,
          selection1: false,
          selection2: false,
          selection3: false,
          selection4: false,
          quizOver: false,
        }
      }

    static contextTypes = {
      router: PropTypes.object,
    }

    getQuizName = () => {
      const request = new Request('http://localhost:8080/private/getQuizName/' + this.props.match.params.id);
      fetch(request)
      .then(response => response.json())
          .then(data => {
            let y = { ...this.state.requestData, "QuizName" : data};
            this.setState({requestData: y});
          });
    }
    getPlayerName = () => {
      const request = new Request('http://localhost:8080/private/getPlayerName/');
      fetch(request)
      .then(response => response.json())
        .then(data => {
          let y = { ...this.state.requestData, "PlayerName" : data};
          this.setState({requestData: y});
        });
    }
    getPlayerId = () => {
      const request = new Request('http://localhost:8080/private/getPlayerId/');
      fetch(request)
      .then(response => response.json())
        .then(data => {
          let y = { ...this.state.requestData, "PlayerID" : data};
          this.setState({requestData: y});
        });
    }
   
      // Lifecycle hook, runs after component has mounted onto the DOM structure
      componentDidMount() {
        const request = new Request('http://localhost:8080/private/question-list/' + this.props.match.params.id);
        fetch(request)
          .then(response => response.json())
            .then(data => this.setState({data: data}) ); 
        this.getPlayerId();
        this.getQuizName();
        this.getPlayerName();
        this.state.requestData.QuizID = this.props.match.params.id;
        console.log(this.state.requestData);                 
      }

      redirectToHome = (event) => {
          event.preventDefault();
  
          fetch('http://localhost:8080/private/AddScore/', {
            method: 'POST',
          //  mode: 'no-cors',
            body: JSON.stringify(this.state.requestData),
          })
              .then(response => {
                if(response.status >= 200 && response.status < 300) {
                  this.context.router.history.push("/PlayerHome/" + this.state.requestData.PlayerID)
                }

              });
      }
      
      updateQuestion = (event)=> {
        var qno = this.state.questionNumber;

        if(this.state.selection1 == this.state.data[this.state.questionNumber]["ans1"] && this.state.selection2 == this.state.data[this.state.questionNumber]["ans2"] &&
        this.state.selection3 == this.state.data[this.state.questionNumber]["ans3"] && this.state.selection4 == this.state.data[this.state.questionNumber]["ans4"]){

          this.state.requestData.Score = this.state.requestData.Score + 10;
        }
          // this.setState({selection1: false});
          // this.setState({selection2: false});
          // this.setState({selection3: false});
          // this.setState({selection4: false});
          this.state.selection1 = false;
          this.state.selection2 = false;
          this.state.selection3 = false;
          this.state.selection4 = false;

        this.setState({questionNumber : this.state.questionNumber + 1});
        if(this.state.questionNumber == this.state.data.length) {
          this.setState({quizOver: true});
        }
      }
      HandleSelection1 = (event) => {
        this.setState({selection1: true});
      }
      HandleSelection2 = (event) => {
        this.setState({selection2: true});
      }
      HandleSelection3 = (event) => {
        this.setState({selection3: true});
      }
      HandleSelection4 = (event) => {
        this.setState({selection4: true});
      }
     
  render() {
    return (
      <div className="App">
        <div>
          <header className="App-header">
            <h1 className="App-title">Quiz {this.props.match.params.id}. {this.state.requestData.QuizName}</h1>
          </header>
          {this.state.data.length > 0 && this.state.questionNumber < this.state.data.length &&
            <div>
              <h3> Q. {this.state.data[this.state.questionNumber]["question"]} </h3>
              { this.state.data[this.state.questionNumber]["QuestionType"] == "Image" &&
                <div>
                    <br/>
                    <img src={this.state.data[this.state.questionNumber]["URL"]}></img>
                    <br/>
                  </div>
              }
              { this.state.data[this.state.questionNumber]["QuestionType"] == "Video" &&
                <div>
                  <br/>
                    <ReactPlayer url={this.state.data[this.state.questionNumber]["URL"]} playing />
                  <br/>
                  </div>
              }

              <button type="submit" className="btn btn-default" onClick={this.HandleSelection1} >
                <h5> {this.state.data[this.state.questionNumber]["opt1"]} </h5>
              </button>

              <button type="submit" className="btn btn-default" onClick={this.HandleSelection2} >
                <h5> {this.state.data[this.state.questionNumber]["opt2"]} </h5>
              </button>
              <br/>

              <button type="submit" className="btn btn-default" onClick={this.HandleSelection3} >
                <h5> {this.state.data[this.state.questionNumber]["opt3"]} </h5>
              </button>

              <button type="submit" className="btn btn-default" onClick={this.HandleSelection4} >
                <h5> {this.state.data[this.state.questionNumber]["opt4"]} </h5>
              </button>
              <br/>
              
              <button type="submit" className="btn btn-default" onClick={this.updateQuestion}>Next</button>
            </div>
          }
          {this.state.questionNumber >= this.state.data.length &&
            <div>
              <h4> Quiz is finished. You scored {this.state.requestData.Score} out of {this.state.data.length * 10}. Click on finish to go back to the home page. </h4>

              <button type="submit" className="btn btn-default" onClick={this.redirectToHome}>Next</button>
            </div>
          }
          <br/>
          </div>
      </div>
    );
  }
}

export default TakeQuizLink;
