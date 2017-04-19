import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export default class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.populateLogin = this.populateLogin.bind(this);
    }

    populateLogin() {
        // console.log('Nav:playerName', this.props.playerName)
        if (this.props.playerName) {
            return (
                <li><Link to="/login">{this.props.playerName}</Link></li>
            )
        } else {
            return <li><Link to="/login">Login</Link></li>
        }
    }

    render() {
        return (
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <Link className="navbar-brand" to="/">Socket-Game-Platform</Link>
                    </div>
                    <div id="navbar" className="collapse navbar-collapse">
                        <ul className="nav navbar-nav">
                            <li><Link to="/">Lobby</Link></li>
                            {/*
                            <li><a href="/game.html">Redirect Game</a></li>
                            */}
                            {this.populateLogin()}
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}