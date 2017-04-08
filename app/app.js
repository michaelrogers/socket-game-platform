// Libs
import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// Component
// import { Lobby } from './components/Lobby.js';
// import { Error404 } from './components/Error404';

import RouterConfig from './config/routes';
// var routes = require('./config/routes.js');
/*
ReactDOM.render((
    <Router>
        <Route path="/" component={Lobby}>

        </Route>
    </Router>
), document.getElementById("app"));

*/


ReactDOM.render((
    <RouterConfig/>
), document.getElementById("app"));
