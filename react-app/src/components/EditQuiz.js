import React, { Component } from 'react';
import './EditQuiz.css';
import AddQuestion from './AddQuestion'

class EditQuiz extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      QuizID : 0,
      QuestionID: 0,
      submitted: false,
    }
    this.handleChange = this.handleChange.bind(this);
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    this.state.QuizID = this.props.id;
    const request = new Request('http://localhost:8080/private/question-list/' + this.props.id);
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }
  
  handleChange=(event)=> {
    this.state.QuestionID = event.target.value;
  }

  delete_question = (event)=> {
    event.preventDefault();
    fetch('http://localhost:8080/private/delete-question/' + this.state.QuestionID, {
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
          <h1 className="App-title">Edit Quiz {this.props.id}</h1>
        </header>
        <div className="formContainer">
        <form onSubmit={this.delete_question}>

          <table className="table-hover">
            <thead>
              <tr>
                <th>Select</th>
                <th>ID</th>
                <th>Question</th>
                <th>Option A</th>
                <th>Option B</th>
                <th>Option C</th>
                <th>Option D</th>
              </tr>
            </thead>
            <tbody>{this.state.data.map((item, key) => {
                return (
                    <tr key = {key}>
                        <td><input type="radio" value={item.id} name="select" onClick={this.handleChange}/></td>
                        <td>{item.id}</td>
                        <td>{item.question}</td>
                        <td>{item.opt1}</td>
                        <td>{item.opt2}</td>
                        <td>{item.opt3}</td>
                        <td>{item.opt4}</td>
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

export default EditQuiz;
