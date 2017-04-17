import React from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import helpers from "./utils/helpers";

export default class Lobby extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        // Functions must be bound manually with ES6 classNames
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleNewUser = this.handleNewUser.bind(this);
    }

    handleChange(e) {
        let newState = {};
        newState[e.target.id] = e.target.value;
        this.setState(newState);
    }

    handleLogin(e) {
        helpers.login(this.state.inputUsername);
    }

    handleNewUser(e) {
        helpers.createNewPlayer(this.state.inputUsername)
        .then(response => {
            console.log('New User Response', response)
            this.props.setPlayerInfo(response.name, response._id);
        });
    }


    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state);
        // sessionStorage.setItem('inputUsername', this.state.inputUsername)
    }


 render() {
    return (
    <div className="col-xs-12 col-xs-offset-0">
        <div className="row">
            <div className="jumbotron">
                <h2>Login</h2>
            </div>
        </div>        

        <div className="row">
        <div className="col-xs-8 col-xs-offset-2">
        <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label htmlFor="inputUsername">Username</label>
                <input type="text" className="form-control" id="inputUsername" placeholder="Username" onChange={this.handleChange}/>
            </div>
            {/*
            <div className="form-group">
                <label htmlFor="password">Password </label>
                <input type="password" className="form-control" id="password" placeholder="Password" onChange={this.handleChange}/>
            </div>
            */}
            {/* 
            <button type="submit" onClick={this.handleLogin} className="btn btn-default">Login</button>
            */}
            <button type="submit" onClick={this.handleNewUser} className="btn btn-primary">New Account</button>
            
        </form>
        </div>
        </div>
    
    </div>
    );
    }
}
