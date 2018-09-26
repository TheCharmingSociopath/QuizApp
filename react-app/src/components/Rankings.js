import React, { Component } from 'react';
import './Rankings.css';

class Rankings extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    }
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://localhost:8080/private/GetHistory/');
    fetch(request)
      .then(response => response.json())
        .then(data => {this.setState({data: data}); console.log(this.state.data)} );
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Leaderboard</h1>
        </header>
        <div className="formContainer">
            <table className="table-hover">
              <thead>
                <tr>
                  <th>Player Name</th>
                  <th>Quiz ID</th>
                  <th>Quiz Name</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>{this.state.data.map((item, key) => {
                  return (
                      <tr key = {key}>
                          <td>{item.playername}</td>
                          <td>{item.QuizId}</td>
                          <td>{item.quizname}</td>
                          <td>{item.score}</td>
                      </tr>
                    )
                })}
              </tbody>
            </table>
        </div>
      </div>
    );
  }
}

export default Rankings;
