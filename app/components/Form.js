import React from "react";

class Form extends React.Component {
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
        <div className="row">
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
                  <div class="form-group">
                    <label class="col-md-4 control-label" for="appendedtext">Appended Text</label>
                    <div class="col-md-4">
                      <div class="input-group">
                        <input id="appendedtext" name="appendedtext" class="form-control" placeholder="placeholder" type="text"/>
                        <span class="input-group-addon">append</span>
                      </div>
                      <p class="help-block">help</p>
                    </div>
                  </div>
                </form>

              </div>
              <div className="panel-body text-center"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

// Export the component back for use in other files
export { Form }; 
// module.exports = Form;