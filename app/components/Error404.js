// Include React
import React from "react";

// This is the Form, our main component. It includes the banner and form element
export default class Error404 extends React.Component {
  
 render() {
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron">
            <h2>Not Found</h2>
            <p>
              <em>Error 404</em>
            </p>
          </div>
        </div>
      </div>
    );
  }
};

// Export the component back for use in other file 