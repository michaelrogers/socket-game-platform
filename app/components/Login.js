import React from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Styles from './styles/customStyles.js';

import helpers from "./utils/helpers";

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
                <button type="submit" onClick={this.handleLogout} className="btn btn-primary">Log Out</button>
            );
        } else {
            return (
                <button type="submit" onClick={this.handleNewUser} className="btn btn-primary">Create Account</button>
            );
        }
    }

 render() {
    return (
    <div className="container">


        <div className="row">
        <div className="ccol s6 offset-s4">
            <div className="form-group">
                <label htmlFor="inputUsername">Username</label>
                <input type="text" className="form-control" id="inputUsername" placeholder="Username" onChange={this.handleChange} defaultValue={this.props.globalData.playerName} />
                {this.displayControls()}
            </div>
            {/*
            <div className="form-group">
                <label htmlFor="password">Password </label>
                <input type="password" className="form-control" id="password" placeholder="Password" onChange={this.handleChange}/>
            </div>
                {/*
            */}


        </div>
        </div>

    </div>
    );
    }
}
