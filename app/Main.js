// Include React
import React from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Navigation } from './config/routes';


export default class Main extends React.Component {

  render() {
    return (<div className="starter-template">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {this.props.children}
          </div>
        </div>
      </div>
  </div>);
  
  }
}