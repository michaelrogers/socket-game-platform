import React from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Styles from './styles/customStyles.js';
import Paper from 'material-ui/Paper';
import helpers from "./utils/helpers";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

export default class Lobby extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputUsername: undefined
        }
        // Functions must be bound manually with ES6 classNames
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleNewUser = this.handleNewUser.bind(this);
        this.displayControls = this.displayControls.bind(this);
        console.log('Login', this.props)
    }

    handleChange(e) {
        let newState = {};
        newState[e.target.id] = e.target.value;
        this.setState(newState);
    }

    handleLogin(e) {
        helpers.login(this.state.inputUsername);
    }

    handleLogout(e) {
        this.props.setMainState({
            playerId: undefined,
            gameId: undefined,
            playerSelection: undefined,
            playerName: undefined
        });
        sessionStorage.clear();
        document.getElementById('inputUsername').value = "";
    }

    handleNewUser(e) {
        helpers.createNewPlayer(this.state.inputUsername)
        .then(response => {
            console.log('New User Response', response)
            this.props.setPlayerInfo(response.name, response._id);
        });
    }
    handleSubmit(e) { e.preventDefault(); }

    displayControls() {
        if (this.props.globalData.playerId) {
            return (
                <div>
                    <div className="form-group">
                    <label htmlFor="inputUsername">Username</label>
                    <input type="text" disabled className="form-control" id="inputUsername" placeholder="Username" onChange={this.handleChange} defaultValue={this.props.globalData.playerName} />
                    <button style={Styles.button} type="submit" onClick={this.handleLogout} className="btn btn-primary">Log Out</button>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <h6 className="center-align">Suggested Player Name Below</h6>
                    <div className="form-group">
                        <label htmlFor="inputUsername">Username</label>
                        <input type="text" className="form-control" id="inputUsername" placeholder="Username" onChange={this.handleChange} defaultValue={this.state.suggestedPlayerName} />
                        <button style={Styles.button} type="submit" onClick={this.handleNewUser} className="btn btn-primary">Create Account</button>
                    </div>
                </div>
            );
        }
    }

 render() {
    return (
      <div className="col s6 offset-s3">
        <Paper zDepth={2}>
          <Card style={{padding:30, marginTop: 15}}>
            <div className="row">
                <div className="center-align">
                    <h2>Login</h2>
                </div>
            </div>

            <div className="row">
                <div className="col s12">
                    {this.displayControls()}
                </div>
            </div>
          </Card>
        </Paper>

      </div>
    );
    }
}
