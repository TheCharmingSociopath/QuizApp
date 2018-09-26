import React, { Component } from 'react';
import './PlayerHome.css'
import PropTypes from 'prop-types';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class PlayerHome extends Component {

    constructor() {
        super();
        this.state = {
          playerId: 0,
          playerName: "",
          playerEmail: "",
        }
      }

    static contextTypes = {
        router: PropTypes.object,
    }

    componentDidMount() {
        if(this.state.playerName == ""){
            this.getPlayerName();
            this.getPlayerId();
        }
    }


    getPlayerId = () => {
        const request = new Request('http://localhost:8080/private/getPlayerId/');
        fetch(request)
        .then(response => response.json())
            .then(data => this.setState({playerId: data}));
    }
    getPlayerName = () => {
        const request = new Request('http://localhost:8080/private/getPlayerName/');
        fetch(request)
        .then(response => response.json())
            .then(data => this.setState({playerName: data}));
    }
    
    render() {
        return (
        <div className="App">
            <div>
            <header className="App-header">
                <h1 className="App-title">Welcome to QuizApp, {this.state.playerName}</h1>
            </header>
            <Link to={'/ViewQuizzesPlayer'}><button type="submit" className="btn btn-default">View All Quizzes</button></Link>
            <Link to={'/Rankings'}><button type="submit" className="btn btn-default">Rankings</button></Link>
            <br/>
            </div>
        </div>
        );
    }
}

export default PlayerHome;
