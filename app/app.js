import React from 'react';
import ReactDOM from 'react-dom';
// import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// Component
import Main from './Main.js';

ReactDOM.render((<Main/>), document.getElementById("app"));
