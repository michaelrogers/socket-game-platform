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
        } catch (e) { }
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

    this.handleChatInput = this.handleChatInput.bind(this);
    this.addChatMessage = this.addChatMessage.bind(this);
    this.displayChatMessages = this.displayChatMessages.bind(this);
    this.sendChatMessage = this.sendChatMessage.bind(this);
    this.sendSocketInput = this.sendSocketInput.bind(this);
    this.requestJoinRoom = this.requestJoinRoom.bind(this);
    }

    componentWillUnmount() {
        document.querySelector('#canvas').classList.add("hidden");
        console.log('Game Unmount')
        this.props.setMainState({
            gameId: undefined,
            playerSelection: undefined
        });
    }

    componentWillMount() {
        // Redirect users away from page if not logged in or no gameId
        //!this.props.globalData.gameId || 
        if (!this.props.globalData.playerId) {
            window.location.pathname = "/";
        }
        //Clear previous socket

    }

    componentWillReceiveProps() {
       
    }
    
    
    requestJoinRoom() {
        console.log('Request join room', this.props.globalData);
        this.props.socket.emit('room',
            new DataPackage(this.props.globalData, this.props.globalData.playerSelection)
        );
    }




    componentDidMount() {
        console.log('GameId', this.props.globalData.gameId, this.props);
        if (this.props.globalData.gameId) {
            this.requestJoinRoom();
        } else {
            console.log('Create game', this.props.globalData.playerId, this.props);
            if (this.props.globalData.playerId !== null) {
            helpers.createNewGame(this.props.globalData.playerId)
            .then(response => {
                this.props.setMainState({
                    playerSelection: 0,
                    gameId: response._id,
                });
                console.log('Game', this.props);
                this.requestJoinRoom();
            });
        }
        }





        document.querySelector('#canvas').classList.remove("hidden");
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


    addChatMessage(DataPackage) {
        console.log('Add Chat', DataPackage);
        let chatArray = this.state.messages;
        chatArray.push(DataPackage)
        console.log(chatArray)
        this.setState({messages: chatArray});
    }


    sendChatMessage(e) {
        e.preventDefault();
        if (this.state.chatInput.length > 0) {
            // console.log(new DataPackage(this.props.globalData, this.state.playerSelection, 'chat', this.state.chatInput))
        this.props.socket.emit(
            'chat-message',
            new DataPackage(this.props.globalData, this.state.playerSelection, 'chat', this.state.chatInput)
        );
        document.getElementById('message-input').value = "";

        }
    }

    handleChatInput(event) {
        this.setState({chatInput: event.target.value});
    }

    displayChatMessages() {
        return this.state.messages
        .map((message, i) => {
            return <li key={i} className="text-left">{message}</li>
        });
    }

    sendSocketInput(x,y) {
        const data = {
        acc: { x: x, y: y }
        }
        this.props.socket.emit('input',
            new DataPackage(
                this.props.globalData,
                this.props.globalData.playerSelection,
                'acceleration',
                data
            )
        );
    }
    render() {
    return (
    <div>
        <div className="row">
            <Scoreboard
                score={this.state.score}
            />
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
                    <input type="text" className="form-control" id="message-input" onChange={this.handleChatInput} placeholder="Send a message."/>
					<span className="input-group-btn">
						<button className="btn btn-default" id="message-button" type="submit">Send</button>
					</span>
                </form>
				</div>
			</div>
        </div>
        <div className="row">
        <div className="col-xs-8 col-xs-offset-2">
            <a target="_blank"
                href={`/control-device/${this.props.globalData.gameId}/${this.props.globalData.playerId}/${this.props.globalData.playerSelection}`}>go here to connect control device: <br/>
                {`/control-device/${this.props.globalData.gameId}/${this.props.globalData.playerId}/${this.props.globalData.playerSelection}`}
            </a>
            <div>
                <QRCode value={`${window.location.origin}/control-device/${this.props.globalData.gameId}/${this.props.globalData.playerId}/${this.props.globalData.playerSelection}`} />,
            </div>
        </div>
        </div>
        <div id="script-container">
        </div>
        </div>
        );
    }
}
