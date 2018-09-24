import React, { Component } from 'react';
import './SignUp.css';
import PropTypes from 'prop-types';


class SingleCorrect extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
      submitted: false,
      // password_copy: "",
    }
    this.handleFChange = this.handleFChange.bind(this); //first name
    this.handleLChange = this.handleLChange.bind(this); //last name
    this.handleEChange = this.handleEChange.bind(this); //email
    this.handlePChange = this.handlePChange.bind(this); //password
    // this.handlePCChange = this.handlePCChange.bind(this); //password_copy
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object,
  }

  handleSubmit (event) {
    event.preventDefault();
    fetch('http://localhost:8080/people', {
     method: 'POST',
    //  mode: 'no-cors',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300) {
          this.setState({submitted: true});
          this.context.router.history.push("/");
        }
      });
  }

  handleFChange(event) {
    this.state.formData.firstName = event.target.value;
  }
  handleLChange(event) {
    this.state.formData.lastName = event.target.value;
  }
  handleEChange(event) {
    this.state.formData.email = event.target.value;
  }
  handlePChange(event) {
    this.state.formData.password = event.target.value;
  }
  // handlePCChange(event) {
  //   this.state.password_copy = event.target.value;
  // }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Create a New Account</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>First Name</label>
                <input type="text" className="form-control" value={this.state.firstName} onChange={this.handleFChange}/>
            </div>
            <div className="form-group">
                <label>Last Name</label>
                <input type="text" className="form-control" value={this.state.lastName} onChange={this.handleLChange}/>
            </div>
            <div className="form-group">
                <label>Email</label>
                <input type="text" className="form-control" value={this.state.email} onChange={this.handleEChange}/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" value={this.state.password} onChange={this.handlePChange}/>
            </div>
            {/* <div className="form-group">
                <label>Repete Password</label>
                <input type="password" className="form-control" value={this.state.password_copy} onChange={this.handlePCChange}/>
            </div> */}
            <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>

        {this.state.submitted &&
          <div>
            <h2>
              New account successfully created.
            </h2>
          </div>
        }

      </div>
    );
  }
}

export default SingleCorrect;
