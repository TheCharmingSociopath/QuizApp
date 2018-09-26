import React, { Component } from 'react';
import SignUp from './SignUp';
import Home from './Home';
import Login from './Login';
import ViewAllQuizzes from './ViewAllQuizzes';
import CreateQuiz from './CreateQuiz';
import ViewPeople from './ViewPeople';
import AddQuestion from './AddQuestion';
import EditQuiz from './EditQuiz';
import EditQuestion from './EditQuestion';
import PlayerHome from './PlayerHome.js';
import ViewQuizzesPlayer from './ViewQuizzesPlayer';
import TakeQuiz from './TakeQuiz';
import Rankings from './Rankings';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

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
                 <Route exact path='/CreateQuiz' component={CreateQuiz} />
                 <Route exact path='/ViewPeople' component={ViewPeople} />
                 <Route exact path='/AddQuestion/:id' component={AddQuestion} />
                 <Route exact path='/EditQuiz/:id' component={EditQuiz} />
                 <Route exact path='/EditQuestion/:id' component={EditQuestion} />
                 <Route exact path='/PlayerHome/:id' component={PlayerHome} />
                 <Route exact path='/ViewQuizzesPlayer' component={ViewQuizzesPlayer} />
                 <Route exact path='/TakeQuiz/:id' component={TakeQuiz} />
                 <Route exact path='/Rankings' component={Rankings} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
