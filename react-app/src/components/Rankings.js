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
    const request = new Request('http://localhost:8080/private/CommonRanking/');
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
                  <th>Select</th>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email ID</th>
                </tr>
              </thead>
              <tbody>{this.state.data.map((item, key) => {
                  return (
                      <tr key = {key}>
                          <td><input type="radio" value={item.id} name="select" onClick={this.handleChange} /></td>
                          <td>{item.id}</td>
                          <td>{item.firstname}</td>
                          <td>{item.lastname}</td>
                          <td>{item.email}</td>
                      </tr>
                    )
                })}
              </tbody>
            </table>
            <button type="submit" className="btn btn-default">Delete</button>
        </div>
      </div>
    );
  }
}

export default Rankings;
