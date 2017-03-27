import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Form from '../components/Form';
import Error404 from '../components/Error404';

const Routes = (props) => (
  <Router history={hashHistory}>
    <Route path="/" component={Form} />
    <Route path="/404" component={Error404} />
  </Router>
);

export default  { Routes };