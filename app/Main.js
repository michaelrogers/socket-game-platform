// Include React
import React from "react";

class Lobby extends React.Component {

  // Here we render the function
  render() {

    return (

      <div className="container">
        <div className="jumbotron">
          <h2><strong>Which Child???</strong></h2>
          <p><em>A journey through the whimsical world of React Routing</em></p>
          <hr />
          <p>
            <a href="#/Child1" className="btn btn-primary btn-lg">Show Child #1</a>
            <a href="#/Child2" className="btn btn-primary btn-lg">Show Child #2</a>
          </p>
        </div>

        <div className="row">

          {/* This code will dump the correct Child Component */}
          {this.props.children}

        </div>

      </div>
    );
  
  }
}

// Export the component back for use in other files
export default Main;