import React, { Component } from 'react';
import './ViewPeople.css';

class ViewPeople extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      id: -1,
      submitted: false,
    }
    this.handleChange = this.handleChange.bind(this);
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://localhost:8080/private/AllPeople/');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  handleChange=(event)=> {
    this.state.id = event.target.value;
  }

  deletePeople = (event)=> {
    event.preventDefault();
    fetch('http://localhost:8080/private/DeletePerson/' + this.state.id, {
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
          <h1 className="App-title">View All People</h1>
        </header>
        <div className="formContainer">
          <form onSubmit={this.deletePeople}>
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
          </form>
        </div>
      </div>
    );
  }
}

export default ViewPeople;
