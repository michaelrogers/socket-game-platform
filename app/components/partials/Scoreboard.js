import React from "react";
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// import helpers from "./utils/helpers";
let coundownInterval;

export default class Scoreboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        // Functions must be bound manually with ES6 classNames
        // this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleChange = this.handleChange.bind(this);
        // this.handleLogin = this.handleLogin.bind(this);
        this.state.timer = 0;
        // this.handleNewUser = this.handleNewUser.bind(this);
        this.startCountdown = this.startCountdown.bind(this);
    }

    startCountdown() {
        this.setState({timer: 60});
        clearInterval(coundownInterval);
         coundownInterval = setInterval(() => {
            if (this.state.timer > 0) {
                const newTime = this.state.timer - 1;
                this.setState({timer: newTime});
            }
            else {
                console.log('Timer finished');
                clearInterval(coundownInterval);
            }
        }, 1000)
    }

    // handleChange(e) {
    //     let newState = {};
    //     newState[e.target.id] = e.target.value;
    //     this.setState(newState);
    // }

    // handleLogin(e) {
    //     helpers.login(this.state.username);
    // }

    // handleNewUser(e) {
    //     helpers.createNewPlayer(this.state.username);
    // }


    // handleSubmit(e) {
    //     e.preventDefault();
    //     console.log(this.state);
    //     // sessionStorage.setItem('username', this.state.username)
    // }


 render() {
    return (
    <div className="col-xs-6 col-xs-offset-3">
        <div className="row">
            <h3>Scoreboard</h3>
            <div className="col-xs-6">
                bat swings: 
                <h3>{this.props.score.batSwings}</h3>
            </div>
            <div className="col-xs-6">
                hits: 
                <h3>{this.props.score.hits}</h3>
            </div>
        </div>
        <div className ="row">
            <h2>{this.state.timer}</h2>
            <button className="btn btn-large" onClick={this.startCountdown}>Start Game</button>
        </div>
    </div>
    );
  }
}
