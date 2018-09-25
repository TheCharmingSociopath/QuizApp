import React, { Component } from 'react';
import './AddQuestion.css';
import PropTypes from 'prop-types';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class AddQuestion extends Component {
    constructor() {
      super();
      this.state = {
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
        },
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
        this.state.formData.QuizId = this.props.match.params.id;
      }
    
    handleSubmit (event) {
      event.preventDefault();
      fetch('http://localhost:8080/private/AddQuestion/', {
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
      this.state.formData.Question = event.target.value;
    }
    handleO1Change(event) {
      this.state.formData.opt1 = event.target.value;
    }
    handleO2Change(event) {
      this.state.formData.opt2 = event.target.value;
    }
    handleO3Change(event) {
      this.state.formData.opt3 = event.target.value;
    }
    handleO4Change(event) {
      this.state.formData.opt4 = event.target.value;
    }
    makeOpt1True(event) {
        this.state.formData.ans1 = true;
    }
    makeOpt2True(event) {
        this.state.formData.ans2 = true;
    }
    makeOpt3True(event) {
        this.state.formData.ans3 = true;
    }
    makeOpt4True(event) {
        this.state.formData.ans4 = true;
    }
    makeOpt1False(event) {
        this.state.formData.ans1 = false;
    }
    makeOpt2False(event) {
        this.state.formData.ans2 = false;
    }
    makeOpt3False(event) {
        this.state.formData.ans3 = false;
    }
    makeOpt4False(event) {
        this.state.formData.ans4 = false;
    }

    render() {
        
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Adding a question to quiz ID: {this.props.match.params.id} </h1>
          </header>
          <br/><br/>
          <div className="formContainer">
            <form className="form" onSubmit={this.handleSubmit}>
              <div className="form-group">
                  <label>Question</label>
                  <input type="text" className="form-control" value={this.state.Question} onChange={this.handleQChange}/>
              </div>

              <div className="form-group">
                  <label>Option 1</label>
                  <input type="text" className="form-control" value={this.state.opt1} onChange={this.handleO1Change}/>
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
                  <input type="text" className="form-control" value={this.state.opt2} onChange={this.handleO2Change}/>
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
                  <input type="text" className="form-control" value={this.state.opt3} onChange={this.handleO3Change}/>
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
                  <input type="text" className="form-control" value={this.state.opt4} onChange={this.handleO4Change}/>
                  <div className="dropdown">
                       <button className="dropbtn">4. {this.state.formData.ans4.toString()}</button>
                       <div className="dropdown-content">
                           <a value={true} onClick={this.makeOpt4True} href="#">True</a>
                           <a value={false} onClick={this.makeOpt4False} href="#">False</a>
                       </div>
                  </div>
              </div>

              <button type="submit" className="btn btn-default">Submit</button>
            </form>
          </div>
  
          {this.state.submitted &&
            <div>
              <h3>
                New Question Added.
              </h3>
            </div>
          }
  
        </div>
      );
    }
  }
  
  export default AddQuestion;
  