// Libs
import React from 'react';
import ReactDOM from 'react-dom';
// import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// Component
import Main from './Main.js';
// import Lobby from './components/Lobby.js';
// import Error404 from './components/Error404.js';

import { NavRouter } from './config/routes.js';

// import RouterConfig from './config/routes';
// var routes = require('./config/routes.js');
// ReactDOM.render((
//     <Router>
//         <Route path="/" component={Main}>
//             <IndexRoute component={Lobby}/>
//         </Route>
//     </Router>
// ), document.getElementById("app"));




ReactDOM.render((
    <NavRouter/>
), document.getElementById("app"));
