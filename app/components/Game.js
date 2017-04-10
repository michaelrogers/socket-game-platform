import React from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export default class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    // Functions must be bound manually with ES6 classNamees
    this.state.gameId = sessionStorage.getItem('room-id') || null;
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }

 render() {
    return (
    <div>
      <div className="row">
        <div className="col-xs-2 col-xs-offset-2">
            <div className="input-group">
                <select name="player-selection" id="player-selection" className="form-control">
                    <option value="1">Player 1</option>
                    <option value="2">Player 2</option>
                    <option defaultValue value="0">Spectator</option>
                </select>
            </div>
            </div>
            <div className="col-xs-2">
            <div className="input-group">
                <input name="room-id"  className="form-control" value={this.state.gameId} />
                <span className="input-group-btn">
                    <button className="btn btn-default" id="room-id-button">Set Room</button>
                </span>
            </div>
        </div>
    </div>
    <div className="row">
	<div className="col-xs-12">
		<div className="" id="canvas-container">
		</div>
	</div>
		</div>
		<div className="row">
			<div className="col-xs-8 col-xs-offset-2">
				<ul id="messages"></ul>
			</div>
		</div>
		<div className="row">
			<div className="col-xs-8 col-xs-offset-2">
				<div className="input-group">
				<input type="text" className="form-control" id="message-input" placeholder="Send a message."/>
					<span className="input-group-btn">
						<button className="btn btn-default" id="message-button" type="button">Send</button>
					</span>
				</div>
			</div>
        </div>
        </div>

        

    );
  }
}
