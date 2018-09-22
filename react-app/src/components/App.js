import React, { Component } from 'react';
import SignUp from './SignUp';
import Home from './Home';
import Login from './Login';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ViewAllQuizzes from './ViewAllQuizzes';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <Link className="navbar-brand" to={'/'}>React App</Link>
                </div>
                <ul className="nav navbar-nav">
                  <li><Link to={'/'}>Home</Link></li>
                  <li><Link to={'/SignUp'}>Sign up</Link></li>
                  <li><Link to={'/Login'}>Login</Link></li>
                </ul>
              </div>
            </nav>
            <Switch>
                 <Route exact path='/' component={Home} />
                 <Route exact path='/SignUp' component={SignUp} />
                 <Route exact path='/Login' component={Login} />
                 <Route exact path='/ViewAllQuizzes' component={ViewAllQuizzes} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
