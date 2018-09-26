import React, { Component } from 'react';
import './EditQuestion.css';
import PropTypes from 'prop-types';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class EditQuestion extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      formData: {
        Question: "",

        opt1: "",
        opt2: "",
        opt3: "",
        opt4: "",

        ans1: false, //True/False
        ans2: false, //True/False
        ans3: false, //True/False
        ans4: false, //True/False

        QuizId: 0,
        QuestionType: "",
        URL: "",
      },
      QuestionID: 0,
      submitted: false,
    }
    this.handleQChange = this.handleQChange.bind(this); //question
    this.handleO1Change = this.handleO1Change.bind(this); //option 1
    this.handleO2Change = this.handleO2Change.bind(this); //option 2
    this.handleO3Change = this.handleO3Change.bind(this); //option 3
    this.handleO4Change = this.handleO4Change.bind(this); //option 4
    this.makeOpt1True = this.makeOpt1True.bind(this)
    this.makeOpt2True = this.makeOpt2True.bind(this)
    this.makeOpt3True = this.makeOpt3True.bind(this)
    this.makeOpt4True = this.makeOpt4True.bind(this)
    this.handleURLChange = this.handleURLChange.bind(this); //URL
    this.handleMCTChange = this.handleMCTChange.bind(this)
    this.handleITChange = this.handleITChange.bind(this)
    this.handleVTChange = this.handleVTChange.bind(this)
    this.makeOpt1False = this.makeOpt1False.bind(this)
    this.makeOpt2False = this.makeOpt2False.bind(this)
    this.makeOpt3False = this.makeOpt3False.bind(this)
    this.makeOpt4False = this.makeOpt4False.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this); //Handle Submit
  }  
  static contextTypes = {
    router: PropTypes.object,
  }

  componentDidMount() {
    const request = new Request('http://localhost:8080/private/GetQuestion/' + this.props.match.params.id);
    fetch(request)
      .then(response => response.json())
        .then(data => {
          console.log(data);
          this.setState({formData: {
            Question: data.question,
    
            opt1: data.opt1,
            opt2: data.opt2,
            opt3: data.opt3,
            opt4: data.opt4,
    
            ans1: data.ans1, //True/False
            ans2: data.ans2, //True/False
            ans3: data.ans3, //True/False
            ans4: data.ans4, //True/False
    
            QuizId: data.QuizID,
            QuestionType: data.QuestionType,
          }, QuestionID: data.id});
        });
  }
  
  handleSubmit (event) {
    console.log(this.state.formData)
    event.preventDefault();
    fetch('http://localhost:8080/private/UpdateQuestion/' + this.state.QuestionID, {
     method: 'POST',
    //  mode: 'no-cors',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300) {
          this.setState({submitted: true});
        }
      });
  }

  handleQChange(event) {
    // this.state.formData.Question = event.target.value;
    let x = {...this.state.formData,
            "Question" : event.target.value}
    this.setState({formData : x});
  }
  handleURLChange(event) {
    this.state.formData.URL = event.target.value;
  }
  handleO1Change(event) {
    let x = {...this.state.formData,
      "opt1" : event.target.value}
    this.setState({formData : x});
  }
  handleO2Change(event) {
    let x = {...this.state.formData,
      "opt2" : event.target.value}
    this.setState({formData : x});
  }
  handleO3Change(event) {
    let x = {...this.state.formData,
      "opt3" : event.target.value}
    this.setState({formData : x});
  }
  handleO4Change(event) {
    let x = {...this.state.formData,
      "opt4" : event.target.value}
    this.setState({formData : x});
  }
  handleMCTChange(event) {
    this.state.formData.QuestionType = "Multiple Correct Type";
  }
  handleITChange(event) {
    this.state.formData.QuestionType = "Image";
  }
  handleVTChange(event) {
    this.state.formData.QuestionType = "Video";
  }
  makeOpt1True(event) {
    let x = {...this.state.formData,
      "ans1" : true}
    this.setState({formData : x});
  }
  makeOpt2True(event) {
    let x = {...this.state.formData,
      "ans2" : true}
    this.setState({formData : x});
  }
  makeOpt3True(event) {
    let x = {...this.state.formData,
      "ans3" : true}
    this.setState({formData : x});
  }
  makeOpt4True(event) {
    let x = {...this.state.formData,
      "ans4" : true}
    this.setState({formData : x});
  }
  makeOpt1False(event) {
    let x = {...this.state.formData,
      "ans1" : false}
    this.setState({formData : x});
  }
  makeOpt2False(event) {
    let x = {...this.state.formData,
      "ans2" : false}
    this.setState({formData : x});
  }
  makeOpt3False(event) {
    let x = {...this.state.formData,
      "ans3" : false}
    this.setState({formData : x});
  }
  makeOpt4False(event) {
    let x = {...this.state.formData,
      "ans4" : false}
    this.setState({formData : x});
  }

  render() {
      
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Edit Question: {this.props.match.params.id} </h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>Question</label>
                <input type="text" className="form-control" value={this.state.formData.Question} onChange={this.handleQChange}/>
            </div>

             <div className="form-group">
                  <label>URL (Only in case of Image or Video)</label>
                  <input type="text" className="form-control" value={this.state.formData.URL} onChange={this.handleURLChange}/>
              </div>

            <div className="form-group">
                <label>Option 1</label>
                <input type="text" className="form-control" value={this.state.formData.opt1} onChange={this.handleO1Change}/>
                <div className="dropdown">
                     <button className="dropbtn">1. {this.state.formData.ans1.toString()}</button>
                     <div className="dropdown-content">
                         <a value={true} onClick={this.makeOpt1True} href="#">True</a>
                         <a value={false} onClick={this.makeOpt1False} href="#">False</a>
                     </div>
                </div>
            </div>

            <div className="form-group">
                <label>Option 2</label>
                <input type="text" className="form-control" value={this.state.formData.opt2} onChange={this.handleO2Change}/>
                <div className="dropdown">
                     <button className="dropbtn">2. {this.state.formData.ans2.toString()}</button>
                     <div className="dropdown-content">
                         <a value={true} onClick={this.makeOpt2True} href="#">True</a>
                         <a value={false} onClick={this.makeOpt2False} href="#">False</a>
                     </div>
                </div>
            </div>

            <div className="form-group">
                <label>Option 3</label>
                <input type="text" className="form-control" value={this.state.formData.opt3} onChange={this.handleO3Change}/>
                <div className="dropdown">
                     <button className="dropbtn">3. {this.state.formData.ans3.toString()}</button>
                     <div className="dropdown-content">
                         <a value={true} onClick={this.makeOpt3True} href="#">True</a>
                         <a value={false} onClick={this.makeOpt3False} href="#">False</a>
                     </div>
                </div>
            </div>

            <div className="form-group">
                <label>Option 4</label>
                <input type="text" className="form-control" value={this.state.formData.opt4} onChange={this.handleO4Change}/>
                <div className="dropdown">
                     <button className="dropbtn">4. {this.state.formData.ans4.toString()}</button>
                     <div className="dropdown-content">
                         <a value={true} onClick={this.makeOpt4True} href="#">True</a>
                         <a value={false} onClick={this.makeOpt4False} href="#">False</a>
                     </div>
                </div>
            </div>

             <div className="form-group">
                  <label>Question Type</label> <br/>
                  <div className="dropdown">
                       <button className="dropbtn">{this.state.formData.QuestionType}</button>
                       <div className="dropdown-content">
                           <a value="Multiple Correct" onClick={this.handleMCTChange} href="#">Multiple Correct Type</a>
                           <a value="Image" onClick={this.handleITChange} href="#">Image</a>
                           <a value="Video" onClick={this.handleVTChange} href="#">Video</a>
                       </div>
                  </div>
              </div>

            <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>

        {this.state.submitted &&
          <div>
            <h3>
              Question has been editted.
            </h3>
          </div>
        }

      </div>
    );
  }
}

export default EditQuestion;
