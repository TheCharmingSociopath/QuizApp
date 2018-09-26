import React, { Component } from 'react';
import './CreateQuiz.css';
import PropTypes from 'prop-types';


class CreateQuiz extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        Name: "",
        Genre: "Science",
      },
      submitted: false,
    }
    this.handleNChange = this.handleNChange.bind(this); //quiz name
    this.handleGChange = this.handleGChange.bind(this); //genere
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object,
  }

  handleSubmit (event) {
    event.preventDefault();
    console.log(this.state.Genre)
    fetch('http://localhost:8080/private/CreateQuiz/', {
     method: 'POST',
    //  mode: 'no-cors',
    // credentials: 'include',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300) {
          this.setState({submitted: true});
        }
      });
  }

  handleNChange(event) {
    this.state.formData.Name = event.target.value;
  }
  handleGChange(event) {
    this.state.formData.Genre = event.target.value;
    console.log(event.target.value, this.state.formData.Genre)
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Create a New Quiz</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" value={this.state.Name} onChange={this.handleNChange}/>
            </div>
            <div className="form-group">
                <label>Genre</label> <br/>
                <select onChange={this.handleGChange} value={this.state.value}>
                  <option value="Science">Science</option>
                  <option value="Math">Mathematics</option>
                  <option value="TV Series">TV Series</option>
                  <option value="IIIT">IIIT</option>
                </select>
            </div>
            <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>

        {this.state.submitted &&
          <div>
            <h3>
              New Quiz Added. Please go to edit quiz and add at least 5 questions to the quiz.
            </h3>
          </div>
        }

      </div>
    );
  }
}

export default CreateQuiz;
