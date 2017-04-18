import React from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Scoreboard from './partials/Scoreboard';
import Pinata from './partials/Pinata';
import QRCode from 'qrcode-react';
import helpers from "./utils/helpers";

const appendScript = (scriptArray, selector) => {
    scriptArray.map(scriptPath => {
        const script = document.createElement('script');
        script.src = scriptPath;
        try { document.querySelector(selector).appendChild(script);
        } catch (e) {  }
    });
}

function DataPackage(globalData, playerSelection, dataType = null, data = null) {
    this.roomId = globalData.gameId;
    this.data = data;
    this.playerId = globalData.playerId;
    this.playerSelection = playerSelection;
    this.dataType = dataType;
    this.timestamp = Date.now();
}
const inputEventHandler = (DataPackage) => {
    const a_y = DataPackage.data.acc.y;
    const a_x = DataPackage.data.acc.x;
    const mag  = Math.sqrt(Math.pow(a_y, 2) + Math.pow(a_x, 2));
    const alpha = Math.atan(a_x/(a_y))*( 180 / Math.PI);
    if (DataPackage.playerSelection == 0) {
        updateSpring(mag, alpha)
    } else if (DataPackage.playerSelection == 1) {
        drawBat(mag);
    } else console.log('Nope');

}

export default class Lobby extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiResponse: {},
            playerSelection: null,
            chatInput: null,
            messages: [],
            score: {
                player1: 0,
                player2: 0
            },
            acceleration: {
                x: 0,
                y: 0,
                z: 0
            }
    };

    this.handleChange = this.handleChange.bind(this);
    this.addChatMessage = this.addChatMessage.bind(this);
    this.displayChatMessages = this.displayChatMessages.bind(this);
    this.sendChatMessage = this.sendChatMessage.bind(this);
    // this.updatePlayerSelection = this.updatePlayerSelection.bind(this);
    // this.onKeyPress = this.onKeyPress.bind(this);

    // this.childData = this.childData.bind(this);
    this.sendSocketInput = this.sendSocketInput.bind(this);

}
    componentWillMount () {
    }
    componentWillUnmount () {
        document.querySelector('#canvas').classList.add("hidden");

    }
    componentDidMount() {
        this.setState({playerSelection: sessionStorage.getItem('player-selection')});
        document.querySelector('#canvas').classList.remove("hidden");
        this.props.socket.emit('room',
            new DataPackage(this.props.globalData, this.state.playerSelection)
        );

        this.props.socket.on('connection-status', this.addChatMessage);
        this.props.socket.on('chat-message', this.addChatMessage);
        this.props.socket.on('input', inputEventHandler);
    }

    // onKeyPress(e){
    //     if (this.state.playerSelection == 1 || this.state.playerSelection == 2) {
    //         const acceptedKeys = [119, 97, 115, 100, 32];

    //         if (acceptedKeys.indexOf(e.charCode) !== -1) {
    //             e.preventDefault();
    //             this.props.socket.emit('input',
    //                 new DataPackage(
    //                     this.props.globalData,
    //                     this.state.playerSelection,
    //                 )
    //             );
    //         }
    //     }
    // }


    addChatMessage(message) {
        let chatArray = this.state.messages;
        chatArray.push(message)
        this.setState({messages: chatArray});
    }


    sendChatMessage(e) {
        e.preventDefault();
        if (this.state.chatInput.length > 0) {
        this.props.socket.emit(
            'chat-message',
            new DataPackage(this.props.globalData, this.state.playerSelection, this.state.chatInput)
        );
        this.setState({chatInput: ""});
        document.getElementById('message-input').value = "";

        }
    }

    handleChange(event) {
        this.setState({chatInput: event.target.value});
    }

    displayChatMessages() {
        return this.state.messages
        .map((message, i) => {
            return <li key={i} className="text-left">{message}</li>
        });
    }

    // updatePlayerSelection(event) {
    //     this.setState({playerSelection: parseInt(event.target.value)})
    // }
    // childData(x, y) {
    // }
    sendSocketInput(x,y) {
        const data = {
        acc: {
                x: x,
                y: y
            }
        }
        this.props.socket.emit('input',
            new DataPackage(
                this.props.globalData,
                this.state.playerSelection,
                'acceleration',
                data
            )
        );
    }

    componentWillMount() {
      // let long_url = window.location.origin + "/control_device/" + this.props.globalData.gameId + "/" + this.props.globalData.playerId;
      let long_url = "http://192.168.1.66:3000/control_device/" + this.props.globalData.gameId + "/" + this.props.globalData.playerId + "/" + this.state.playerSelection;
      helpers.runQuery(long_url).then(function(response) {
        this.setState({
          apiResponse: {
            bitlyURL: response.url
          }
        });
      }.bind(this));
    }


render() {
    return (
    <div>
        <div className="row">
        <Scoreboard
            score={this.state.score}
        />
        <div className="col-xs-8 col-xs-offset-2">
        {/* Motion Component*/}
        {/*< Motion childData={this.childData}/>*/}

                <input type="text" onKeyPress={this.onKeyPress} />
           {/*
            <div className="input-group">
                <select name="player-selection" id="player-selection" className="form-control" onChange={this.updatePlayerSelection}>
                    <option value="1">Player 1</option>
                    <option value="2">Player 2</option>
                    <option value="0">Spectator</option>
                </select>
            </div>
            */}
            </div>
            <div className="col-xs-2">
            <div className="input-group">
                <p> gameId: {this.props.globalData.gameId}</p>
                <p> playerId: {this.props.globalData.playerId}</p>
            </div>
        </div>
    </div>
    <div className="row">
	<div className="col-xs-12">
	</div>
		</div>
		<div className="row">
			<div className="col-xs-8 col-xs-offset-2">
				<ul id="messages" className="list-unstyled">
                    {this.displayChatMessages()}
                </ul>
			</div>
		</div>
		<div className="row">
			<div className="col-xs-8 col-xs-offset-2">
				<div className="input-group">
                <form onSubmit={this.sendChatMessage}>
                    <input type="text" className="form-control" id="message-input" onChange={this.handleChange} placeholder="Send a message."/>
					<span className="input-group-btn">
						<button className="btn btn-default" id="message-button" type="submit">Send</button>
					</span>
                </form>
				</div>
			</div>
        </div>
        <div>
            <Link
                to={`/control_device/${this.props.globalData.gameId}/${this.props.globalData.playerId}/${this.state.playerSelection}`}>go here to connect control device: <br/>
                {`/control_device/${this.props.globalData.gameId}/${this.props.globalData.playerId}/${this.state.playerSelection}`}
             </Link>
        </div>
        <div>
          Control Device Link: <strong>{this.state.apiResponse.bitlyURL}</strong>
        </div>
        <div>
          {/* <QRCode value={`${window.location.origin}/control_device/${this.props.globalData.gameId}/${this.props.globalData.playerId}/${this.state.playerSelection}`} />, */}
            <QRCode value={`http://192.168.1.66:3000/control_device/${this.props.globalData.gameId}/${this.props.globalData.playerId}/${this.state.playerSelection}`} />,
        </div>
        <div id="script-container">
        </div>
        </div>
        );
    }
}
