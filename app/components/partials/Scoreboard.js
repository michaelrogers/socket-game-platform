import React from "react";
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
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
        this.setState({timer: 0});
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
    <div className="scoreboard-wrapper">
        <Card style={{borderRadius:15, textAlign:"center"}}>
          <CardActions>
            <h5>{this.state.timer}</h5>
            <button className="btn" onClick={this.startCountdown}>Start Game</button>
          </CardActions>
          <CardText>
            <div className="row">
              <div className="col s3">
                <img style={{width:30}} className="circle responsive-img" src="/img/bird-sm.png" />
              </div>
              <div className="col s9">
                  <h6>Avoided: {this.props.swings}</h6>
              </div>
            </div>
            <div className="row" style={{marginBottom:0}}>
              <div className="col s3">
                <img style={{width:25}} className="circle responsive-img" src="/img/arm125.png" />
              </div>
              <div className="col s9">
                  <h6>Hits: {this.props.hits}</h6>
              </div>
            </div>
          </CardText>
        </Card>
    </div>
    );
  }
}
