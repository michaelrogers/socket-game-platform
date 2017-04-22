import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import Styles from './styles/customStyles.js';

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
                    <FlatButton style={Styles.button}>
                      <Link to="/login">Login</Link>
                    </FlatButton>
                </ToolbarGroup>
            )
        }
    }

    render() {
        return (
            <Toolbar>
                <ToolbarGroup firstChild={false}>
                    <Link className="navbar-brand" to="/">Socket-Game-Platform</Link>
                    <Link style={{marginLeft:15}} to="/">Lobby</Link>
                </ToolbarGroup>
                {this.populateLogin()}
            </Toolbar>
        )
    }
}
