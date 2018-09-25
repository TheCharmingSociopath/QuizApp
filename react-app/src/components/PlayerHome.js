import React, { Component } from 'react';
import './PlayerHome.css'
import PropTypes from 'prop-types';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class PlayerHome extends Component {

  static contextTypes = {
    router: PropTypes.object,
  }

  render() {
    return (
      <div className="App">
        <div>
          <header className="App-header">
            <h1 className="App-title">Welcome to QuizApp, Admin</h1>
          </header>
          <Link to={'/ViewQuizzesPlayer'}><button type="submit" className="btn btn-default">View All Quizzes</button></Link>
          <br/>
          </div>
      </div>
    );
  }
}

export default PlayerHome;
