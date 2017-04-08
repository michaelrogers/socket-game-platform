import React from "react";

class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = { num1: 0, num2: 0, text: "" };
    // Functions must be bound manually with ES6 classes
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }

 render() {
    return (
      <div className="container">
        <ul>
          <li><Link to="/game">Game</Link></li>
          <li><Link to="/lobby">Lobby</Link></li>
          <li><Link to="/404">Error404</Link></li>
        </ul>
        {/*<div className="row">
          <div className="jumbotron">
            <h2>Chat</h2>
            <p>Sup
              <em>How hot is this?</em>
            </p>
          </div>
          <div className="col-md-6">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title text-center">Chat</h3>
                <form>
                  <div className="form-group">
                    <label className="col-md-4 control-label" htmlFor="appendedtext">Appended Text</label>
                    <div className="col-md-4">
                      <div className="input-group">
                        <input id="appendedtext" name="appendedtext" className="form-control" placeholder="placeholder" type="text"/>
                        <span className="input-group-addon">append</span>
                      </div>
                      <p className="help-block">help</p>
                    </div>
                  </div>
                </form>
              </div>
              <div className="panel-body text-center"></div>
            </div>
          </div>
        </div>*/}
      </div>
    );
  }
}

// Export the component back for use in other files
export { Lobby }
// module.exports = Lobby;