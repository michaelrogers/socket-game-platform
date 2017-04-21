import React from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Scoreboard from './partials/Scoreboard';
import Pinata from './partials/Pinata';
import QRCode from 'qrcode-react';
import helpers from "./utils/helpers";

// ---Styling--
import Styles from './styles/customStyles.js';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import SvgIcon from 'material-ui/SvgIcon';
import Dialog from 'material-ui/Dialog';

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
            
            bitlyURL: null,
            playerSelection: null,
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
            modalIsOpen: false
    };

        


    this.handleChatInput = this.handleChatInput.bind(this);
    this.addChatMessage = this.addChatMessage.bind(this);
    this.displayChatMessages = this.displayChatMessages.bind(this);
    this.sendChatMessage = this.sendChatMessage.bind(this);

    this.batWins = this.batWins.bind(this);
    this.pinataWins = this.pinataWins.bind(this);
    this.batSwings = this.batSwings.bind(this);
    this.batHits = this.batHits.bind(this);
    this.batScore = this.batScore.bind(this);
    this.winner = this.winner.bind(this);
    this.declareWinner = this.declareWinner.bind(this);
    

    this.requestJoinRoom = this.requestJoinRoom.bind(this);

    // --modals--
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);


    }


    componentWillUnmount() {
        // document.querySelector('#canvas').classList.add("hidden");
        console.log('Game Unmount')
        document.querySelector('#canvas').classList.add("hide");
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





        document.querySelector('#canvas').classList.remove("hide");
        this.props.socket.on('connection-status', this.addChatMessage);
        this.props.socket.on('chat-message', this.addChatMessage);
        this.props.socket.on('input', inputEventHandler);
        this.props.socket.on('admin', this.declareWinner);
    }

    addChatMessage(DataPackage) {
        console.log('Add Chat', DataPackage);

        let chatArray = this.state.messages;
        chatArray.push(DataPackage)
        console.log(chatArray)
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
        console.log('swingging in the rain');
        this.batScore('swing', this.state.score.batSwings + 1);
    }

    batHits() {
        console.log('bat hitttinggggg');
    }

    batScore(type, result) {
        console.log('did this work?',type, result);

        // Data package to send to admin channel
        const data = {
            roomId: this.props.globalData.gameId,
            result: result,
            type: type
        }

        // Send data to socket admin channel only once (player 0) and when game is playing
        if(this.props.globalData.playerSelection == 0 && this.state.gameStart) {
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
        switch(data.type) {
            case 'swing':
            console.log('winner inside switch', data.result);
            this.setState({
                score: {
                    batSwings: data.result
                }
            });
            break;

            case 'hit': 
            break;

            default: 
                console.log('meh'); 
                break;
        };
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
            return (
              <ListItem
                key={i}
                >
                {message}
              </ListItem>
            )
        });
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }
    closeModal() {
        this.setState({modalIsOpen:false});
    }

    componentWillMount() {
        let playerSel = sessionStorage.getItem('player-selection');
        let long_url = window.location.origin +"/control_device/" + this.props.globalData.gameId + "/" + this.props.globalData.playerId + "/" + this.state.playerSel;
        helpers.runQuery(long_url).then(function(response) {
        this.setState({ bitlyURL: response.url });
        }.bind(this));
    }

    render() {

        return (
            <div className="container game-wrapper">
                <div className="row">
                    { /* --player header: Left corner-- */}
                    <div className="col s6 playerHeader valign-wrapper">
                        <img style={{float:"left"}} className="circle responsive-img" src="/img/bird-sm.png" />
                        <h4>{this.props.globalData.playerName}</h4>
                        <Scoreboard score={this.state.score}/>
                    </div>
                    
                    { /* --player header: Right corner-- */}
                    <div className="col s6 playerHeader valign-wrapper">
                        <img style={{float:"right", right:0, position:"relative", width:"45px"}} className="circle responsive-img" src="/img/arm125.png" />
                        <h4 style={{float:"right"}}>{this.props.globalData.playerName}</h4>
                    </div>
                </div>
                { /* ----Chat Messages---- */}
                <div className="row">
                    <div className="col s3">
                        <List id="messages" className="list-unstyled">
                        <form onSubmit={this.sendChatMessage}>
                          <TextField
                            id="message-input"
                            hintText="Send a Message"
                            multiLine={true}
                            rows={2}
                            onChange={this.handleChatInput}
                          />
                          <RaisedButton
                              fullWidth={true}
                              label="Send"
                              primary={true}
                              containerElement={
                                  <button id="message-button" type="submit"></button>
                              }
                               />
                        </form>
                            {this.displayChatMessages()}
                        </List>
                    </div>
                </div>

                {/* --- Connect Device ---*/}
                    <div className="col s3">
                        <a target="_blank"
                            href={`/control-device/${this.props.globalData.gameId}/${this.props.globalData.playerId}/${this.props.globalData.playerSelection}`}>go here to connect control device: <br/>
                            {`/control-device/${this.props.globalData.gameId}/${this.props.globalData.playerId}/${this.props.globalData.playerSelection}`}
                        </a>
                        {/* --- bitly - shortened urls ---*/}
                        <div>
                            <h1>Control Device Link: <strong>{this.state.bitlyURL}</strong></h1>
                        </div>
                        {/*Modal button*/}
                        <button
                          className="waves-effect waves-light btn valign-wrapper iconBtn"
                          onClick={this.openModal}
                          >
                          <img style={{padding:"5px"}} src='img/qr-code-icon.png' /> Scan
                        </button>
                        {/* ---QR Code Modal---*/}
                        <Dialog
                          style={{zIndex:10000, width:"260px"}}
                          title="QR Code"
                          modal={false}
                          actions={
                              <FlatButton
                                label="Close"
                                primary={true}
                                onClick={this.closeModal}
                              />}
                          open={this.state.modalIsOpen}
                          onRequestClose={this.closeModal}
                        >
                          <QRCode className="QRcanvas" value={`${window.location.origin}/control-device/${this.props.globalData.gameId}/${this.props.globalData.playerId}/${this.props.globalData.playerSelection}`} />
                        </Dialog>
                    </div>
                    <div id="script-container">
                    </div>

             <div>
             <Link to="#" id="batWins" className="btn btn-primary" onClick={this.batWins} style={{display:"none"}}>bat wins</Link>
             <Link to="#" id="pinataWins" className="btn btn-primary" onClick={this.pinataWins} style={{display:"none"}}>pinata wins</Link>

             <Link to="#" id="batSwings" className="btn btn-primary" onClick={this.batSwings} style={{display:"none"}}>bat swings</Link>

             <Link to="#" id="batHits" className="btn btn-primary" onClick={this.batHits} style={{display:"block"}}>bat hits</Link>
         </div>
            </div>
        );
    }
}