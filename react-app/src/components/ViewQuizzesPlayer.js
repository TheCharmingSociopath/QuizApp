import React, { Component } from 'react';
import './ViewQuizzesPlayer.css';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class ViewQuizzesPlayer extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      id: -1,
      submitted: false,
      TakeQuizLink: '/TakeQuiz/'
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
    this.setState({TakeQuizLink: this.state.TakeQuizLink + event.target.value})
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Select a quiz to take</h1>
        </header>
        <div className="formContainer">
            <table className="table-hover">
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Name</th>
                  <th>Genre</th>
                </tr>
              </thead>
              <tbody>{this.state.data.map((item, key) => {
                  return (
                      <tr key = {key}>
                          <td><input type="radio" value={item.id} name="select" onClick={this.handleChange}/></td>
                          <td>{item.name}</td>
                          <td>{item.genre}</td>
                      </tr>
                    )
                })}
              </tbody>
          </table>
          <Link to={this.state.TakeQuizLink} > <button type="submit" className="btn btn-default">Take this quiz</button></Link>
       </div>
      </div>
    );
  }
}

export default ViewQuizzesPlayer;
