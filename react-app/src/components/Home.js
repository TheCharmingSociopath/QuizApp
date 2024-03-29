import React, { Component } from 'react';
import './Home.css'
import CreateQuiz from './CreateQuiz';
import ViewAllQuizzes from './ViewAllQuizzes';
import ViewPeople from './ViewPeople';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <header className="App-header">
            <h1 className="App-title">Welcome to QuizApp, Admin</h1>
          </header>
          <Link to={'/CreateQuiz'}><button type="submit" className="btn btn-default">Create Quiz</button></Link>
          <br/>
          <Link to={'/ViewAllQuizzes'}><button type="submit" className="btn btn-default">View All Quizzes</button></Link>
          <br/>
          <Link to={'/ViewPeople'}><button type="submit" className="btn btn-default">View All Users</button></Link>
          <br/>
          </div>
      </div>
    );
  }
}

export default Home;
