import React, { Component } from 'react';
import './DeletePerson.css';

class DeletePerson extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      id : 1,
      submitted: false,
    }
    this.handleChange = this.handleChange.bind(this);
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/people/');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }
  
  handleChange=(event)=> {
    this.state.id = event.target.value;
  }

   delete_person = ()=> {
    // console.log('rtshsrthtrs', this.state.id)
    // event.preventDefault();
    fetch('http://localhost:8080/people/' + this.state.id, {
     method: 'DELETE',
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
          <h1 className="App-title">Delete a Person</h1>
        </header>
        <div className="formContainer">
        <form onSubmit={this.delete_person}>

          <table className="table-hover">
            <thead>
              <tr>
                <th>Select</th>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>City</th>
              </tr>
            </thead>
            <tbody>{this.state.data.map((item, key) => {
                return (
                    <tr key = {key}>
                        <td><input type="radio" value={item.id} name="select" onClick={this.handleChange}/></td>
                        <td>{item.id}</td>
                        <td>{item.firstname}</td>
                        <td>{item.lastname}</td>
                        <td>{item.city}</td>
                    </tr>
                  )
              })}
            </tbody>
        </table>

        <button type="submit" className="btn btn-default">Submit</button>
       </form>
       </div>

      </div>
    );
  }
}

export default DeletePerson;
