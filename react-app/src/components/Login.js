import React, { Component } from 'react';
import './Login.css';
import PropTypes from 'prop-types';
import GoogleLogin from 'react-google-login';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        email: "",
        password: "",
      },
      googleFormData: {
        firstName: "",
        lastName: "",
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

  responseGoogle = (response) => {
    this.state.googleFormData.email = response.w3.U3;
    this.state.googleFormData.firstName = response.w3.ofa;
    this.state.googleFormData.lastName = response.w3.wea;

    fetch('http://localhost:8080/people', {
     method: 'POST',
    //  mode: 'no-cors',
     body: JSON.stringify(this.state.googleFormData),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300) {
          response.json()
            .then(
              data => {
                  this.setState({submitted: true});
                  this.context.router.history.push("/PlayerHome/" + data.id);
              }
            )
        }
      });
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

          <GoogleLogin
            clientId="933199541117-05dnde8vm3gf9hlo2dptfr90ntpodl8u.apps.googleusercontent.com"
            buttonText="Login via Google"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
          />

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
