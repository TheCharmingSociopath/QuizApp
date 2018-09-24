import React, { Component } from 'react';
import './ViewAllQuizzes.css';
import EditQuiz from './EditQuiz'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class ViewAllQuizzes extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      id: -1,
      submitted: false,
      EditLink: '/EditQuiz/'
    }
    this.handleChange = this.handleChange.bind(this);
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://localhost:8080/private/quiz-list/');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  handleChange=(event)=> {
    this.state.id = event.target.value;
    this.setState({EditLink: this.state.EditLink + event.target.value})
  }

  deleteQuiz = (event)=> {
    event.preventDefault();
    fetch('http://localhost:8080/private/DeleteQuiz/' + this.state.id, {
     method: 'POST',
     credentials: 'include',
    // headers: {"access-control-allow-origin" : "http://localhost:8080"}
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
        {
            this.submitted = true;
            window.location.reload();
        }
      });
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">View All Quizzes</h1>
        </header>
        <div className="formContainer">
            <table className="table-hover">
              <thead>
                <tr>
                  <th>Select</th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Genre</th>
                </tr>
              </thead>
              <tbody>{this.state.data.map((item, key) => {
                  return (
                      <tr key = {key}>
                          <td><input type="radio" value={item.id} name="select" onClick={this.handleChange}/></td>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>{item.genre}</td>
                      </tr>
                    )
                })}
              </tbody>
          </table>
          <button type="submit" onClick={this.deleteQuiz} className="btn btn-default">Delete</button>
          <Link to={this.state.EditLink} > <button type="submit" className="btn btn-default">Edit Quiz</button></Link>
       </div>
      </div>
    );
  }
}

export default ViewAllQuizzes;
