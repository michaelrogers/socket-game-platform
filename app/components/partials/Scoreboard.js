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


 render() {
    return (
    <div className="">
        <div className="row">
            <h3>Scoreboard</h3>
            <div className="">
                
                <h3>bat swings:{this.props.swings}</h3>
            </div>
            <div className="">
                 
                <h3>hits:{this.props.hits}</h3>
            </div>
        </div>
        <div className ="row">
            <h2>{this.state.timer}</h2>
            <button className="btn" onClick={this.startCountdown}>Start Game</button>
        </div>
    </div>
    );
  }
}
