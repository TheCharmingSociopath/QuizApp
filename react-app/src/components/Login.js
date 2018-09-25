import React, { Component } from 'react';
import './Login.css';
import PropTypes from 'prop-types';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        email: "",
        password: "",
      },
      submitted: false,
      res: "",
    }
    this.handleEChange = this.handleEChange.bind(this); //email
    this.handlePChange = this.handlePChange.bind(this); //password
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object,
  }

  handleSubmit (event) {
    event.preventDefault();
    fetch('http://localhost:8080/authenticate/', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
     credentials: 'include',
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300) {
          this.setState({submitted: true});
        response.json()
            .then(
                data => {
                    if (data["email"] == this.state.formData.email && data["email"] == "aditya") {
                        this.context.router.history.push("/");

                    } else if (data["email"] == this.state.formData.email) {
                        var x = data.id;
                        this.context.router.history.push("/PlayerHome/" + x);

                    } else {
                        console.log('no');
                        this.context.router.history.push("/Login");
                    }
                }
            )
        }
      });
  }

  handleEChange(event) {
    this.state.formData.email = event.target.value;
  }
  handlePChange(event) {
    this.state.formData.password = event.target.value;
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Login</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>Email</label>
                <input type="text" className="form-control" value={this.state.email} onChange={this.handleEChange}/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" value={this.state.password} onChange={this.handlePChange}/>
            </div>
            <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>

        {/* {this.state.submitted &&
          <div>
            <h2>
              New account successfully created.
            </h2>
          </div>
        } */}

      </div>
    );
  }
}

export default Login;
