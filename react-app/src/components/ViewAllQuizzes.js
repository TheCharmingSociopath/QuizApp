import React, { Component } from 'react';
import './ViewAllQuizzes.css';

class ViewAllQuizzes extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://localhost:8080/quiz-list/');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">View All Quizzes</h1>
        </header>

        <table className="table-hover">
          <thead>
            <tr>
              <th>Quiz ID</th>
              <th>Quiz Name</th>
              <th>Genere</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.genere}</td>
                  </tr>
                )
             })}
          </tbody>
       </table>
      </div>
    );
  }
}

export default ViewAllQuizzes;
