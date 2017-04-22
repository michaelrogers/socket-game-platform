import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

export default class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.populateLogin = this.populateLogin.bind(this);
    }

    populateLogin() {
        // console.log('Nav:playerName', this.props.playerName)
        if (this.props.playerName) {
            return (
                <ToolbarGroup>
                    <Link to="/login">Playing as: {this.props.playerName}</Link>
                </ToolbarGroup>
            )
        } else {
            return (
                <ToolbarGroup>
                    <Link to="/login">Login</Link>
                </ToolbarGroup>
            ) 
        }
    }

    render() {
        return (
            <Toolbar style={
                {
                    top:0,
                    left:0,
                    right:0,
                    position:"absolute",
                    // display: "block"
                }
            }>
                <ToolbarGroup firstChild={false}>
                    <Link className="navbar-brand" to="/">Socket-Game-Platform</Link>
                    <ToolbarSeparator />
                    <Link to="/">Lobby</Link>
                </ToolbarGroup>
                {this.populateLogin()} 
            </Toolbar>
        )
    }
}