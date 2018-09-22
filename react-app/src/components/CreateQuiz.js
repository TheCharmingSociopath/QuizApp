import React, { Component } from 'react';
import './CreateQuiz.css';
import PropTypes from 'prop-types';


class CreateQuiz extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        Name: "",
        Genere: "",
      },
      submitted: false,
    }
    this.handleNChange = this.handleNChange.bind(this); //first name
    this.handleGChange = this.handleGChange.bind(this); //password
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object,
  }

  handleSubmit (event) {
    event.preventDefault();
    fetch('http://localhost:8080/CreateQuiz/', {
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

  handleNChange(event) {
    this.state.formData.Name = event.target.value;
  }
  handleGChange(event) {
    this.state.formData.Genere = event.target.value;
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
                <label>Genere</label>
                <input type="text" className="form-control" value={this.state.Genere} onChange={this.handleGChange}/>
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
