// Libs
import React from 'react';
import ReactDOM from 'react-dom';
import  { Router, Route, hashHistory, IndexRoute } from 'react-router';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// Component
import Main from './Main';
import { Lobby } from './components/Lobby';
import { Error404 } from './components/Error404';

import RouterConfig from './config/routes';
// var routes = require('./config/routes.js');
console.log(Main)
ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={Main}>

        <IndexRoute component={Lobby}/>
        </Route>
    </Router>
), document.getElementById("app"));




// ReactDOM.render((
//     <RouterConfig/>
// ), document.getElementById("app"));
