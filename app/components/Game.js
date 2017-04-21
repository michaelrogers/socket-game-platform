import React from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Scoreboard from './partials/Scoreboard';
import Pinata from './partials/Pinata';
import QRCode from 'qrcode-react';

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
                hits: 0,
                batSwings: 0
            },
            acceleration: {
                x: 0,
                y: 0,
                z: 0
            },
            winner: null,
            gameStart: true,
            gameOver: false,
            // batSwings: 0
    };

    this.handleChatInput = this.handleChatInput.bind(this);
    this.addChatMessage = this.addChatMessage.bind(this);
    this.displayChatMessages = this.displayChatMessages.bind(this);
    this.sendChatMessage = this.sendChatMessage.bind(this);
    // this.sendSocketInput = this.sendSocketInput.bind(this);
    this.batWins = this.batWins.bind(this);
    this.pinataWins = this.pinataWins.bind(this);
    this.batSwings = this.batSwings.bind(this);
    this.winner = this.winner.bind(this);
    this.declareWinner = this.declareWinner.bind(this);
    }

    componentWillUnmount() {
        document.querySelector('#canvas').classList.add("hidden");
        this.props.setMainState({
            gameId: undefined,
            playerSelection: undefined
        });
    }

    componentWillMount() {
        console.log('Game', this.props);
        // Redirect users away from page if not logged in or no gameId
        //!this.props.globalData.gameId || 
        if (!this.props.globalData.playerId) {
            window.location.pathname = "/";
        }
    }

    componentDidMount() {
        // this.setState({playerSelection: sessionStorage.getItem('player-selection')});
        document.querySelector('#canvas').classList.remove("hidden");
        this.props.socket.emit('room',
            new DataPackage(this.props.globalData, this.state.playerSelection)
        );

        this.props.socket.on('connection-status', this.addChatMessage);
        this.props.socket.on('chat-message', this.addChatMessage);
        this.props.socket.on('input', inputEventHandler);
        this.props.socket.on('admin', this.declareWinner);
    }

    addChatMessage(message) {
        let chatArray = this.state.messages;
        chatArray.push(message)
        this.setState({messages: chatArray});
    }

    batWins() {
        this.winner(1)
    }

    pinataWins() {
        this.winner(0)
    }

// send through socket and bring back to update DOM
    batSwings() {
        
        // this.state.score.batSwings++;
        console.log('real swing', this.state.score.batSwings)
        const result = this.state.score.batSwings + 1
        const data = {
            roomId: this.props.globalData.gameId,
            result: result,
            type: 'swing'
        }
        if(this.props.globalData.playerSelection == 0 && this.state.gameStart) {
            // console.log('inside if')
            this.props.socket.emit('admin', data);
        }
    }

    winner(player) {
        // console.log('done mm', player);
        // const data = {
        //     roomId: this.props.globalData.gameId,
        //     result: player,
        //     type: 'winner'
        // }
        // if(this.props.globalData.playerSelection == 0 && this.gameStart) {
        //     this.props.socket.emit('admin', data);
        // }
    }
    

    declareWinner(data) {
        console.log('winner is', data.result);
        
        // this.state.score.batSwings = data.result;
        this.setState({
            score: {
                batSwings: data.result
            }
        })
        // this.setState({score: {batSwings: data.result}});
    }


    sendChatMessage(e) {
        e.preventDefault();
        if (this.state.chatInput.length > 0) {
        this.props.socket.emit(
            'chat-message',
            new DataPackage(this.props.globalData, this.state.playerSelection, this.state.chatInput)
        );
        // this.setState({chatInput: ""});
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

    // sendSocketInput(x,y) {
    //     const data = {
    //     acc: {
    //             x: x,
    //             y: y
    //         }
    //     }
    //     if(this.gameStart) {
    //         this.props.socket.emit('input',
    //             new DataPackage(
    //                 this.props.globalData,
    //                 this.props.globalData.playerSelection,
    //                 'acceleration',
    //                 data
    //             )
    //         );
    //     }
        
    // }
    render() {
    return (
    <div>
        <div className="row">
            <Scoreboard
                score={this.state.score}/>
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
        <div>
            <Link to="#" id="batWins" className="btn btn-primary" onClick={this.batWins} style={{display:"hide"}}>bat wins</Link>
            <Link to="#" id="pinataWins" className="btn btn-primary" onClick={this.pinataWins} style={{display:"hide"}}>pinata wins</Link>

            <Link to="#" id="batSwings" className="btn btn-primary" onClick={this.batSwings} style={{display:"block"}}>bat swings</Link>
        </div>
        
        </div>
        
        );
    }
}