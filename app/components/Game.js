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
import Drawer from 'material-ui/Drawer';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

const appendScript = (scriptArray, selector) => {
    scriptArray.map(scriptPath => {
        const script = document.createElement('script');
        script.src = scriptPath;
        try { document.querySelector(selector).appendChild(script);
        } catch (e) { }
    });
};

const killHits = 5;
const avoidHits = 10;

function DataPackage(globalData, playerSelection, dataType = null, data = null) {
    this.roomId = globalData.gameId;
    this.data = data;
    this.playerId = globalData.playerId;
    this.playerSelection = playerSelection;
    this.dataType = dataType;
    this.timestamp = Date.now();
}

export default class Lobby extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bitlyURL: null,
            playerSelection: null,
            chatInput: null,
            messages: [],
            // was having a very strange problem, will try again tomorrow to have this data structure.... it should work... but was getting a weird result
            // score: {
            //     hits: 0,
            //     swings: 0
            // },
            acceleration: {
                x: 0,
                y: 0,
                z: 0
            },

            modalIsOpen: false,
            drawerOpen: false,
            winner: null,
            gameStartCount: 0,
            gameStart: true,
            gameOver: false,
            hits: 0,
            swings: avoidHits,
            modalIsOpen: false,
            bitlyOpen: false
    };

    this.handleChatInput = this.handleChatInput.bind(this);
    this.addChatMessage = this.addChatMessage.bind(this);
    this.displayChatMessages = this.displayChatMessages.bind(this);
    this.sendChatMessage = this.sendChatMessage.bind(this);

    // this.batWins = this.batWins.bind(this);
    // this.pinataWins = this.pinataWins.bind(this);
    this.inputEventHandler = this.inputEventHandler.bind(this);

    // bat state events
    this.batSwings = this.batSwings.bind(this);
    this.batHits = this.batHits.bind(this);

    // general function to send data to admin channel
    this.sendDataAdmin = this.sendDataAdmin.bind(this);

    this.declareWinner = this.declareWinner.bind(this);

    // setNewState from data coming from admin channel
    this.setNewStateAdmin = this.setNewStateAdmin.bind(this);


    this.requestJoinRoom = this.requestJoinRoom.bind(this);

    // --modals--
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    // --drawer--
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);

    //--bitly snackbar--
    this.openBitlySnackbar = this.openBitlySnackbar.bind(this);
    this.closeBitlySnackbar = this.closeBitlySnackbar.bind(this);
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
        //---below: master's latest items---
        let playerSel = sessionStorage.getItem('player-selection');
        let long_url = window.location.origin +"/control_device/" + this.props.globalData.gameId + "/" + this.props.globalData.playerId + "/" + this.state.playerSel;
        helpers.runQuery(long_url).then(function(response) {
        this.setState({ bitlyURL: response.url });
        }.bind(this));
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
        this.props.socket.on('input', this.inputEventHandler);
        this.props.socket.on('admin', this.setNewStateAdmin);
        this.props.socket.on('declareWinner', this.declareWinner)
    }

    addChatMessage(DataPackage) {
        console.log('Add Chat', DataPackage);

        let chatArray = this.state.messages;
        chatArray.push(DataPackage)
        console.log(chatArray)
        this.setState({messages: chatArray});
    }

    inputEventHandler(DataPackage) {
            console.log('data packet befor')
        if(this.state.gameStart) {
            console.log('datapacket if statement')
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
    }

// Collect appropriate data for swings and hits
    batSwings() {
        // Data package to send to admin channel
        const result = this.state.swings - 1;
        let data = {
            roomId: this.props.globalData.gameId,
            result: result,
            type: null
        };
        
        // determine if you have won or lost the game at this point
        if(result >= 1 && this.state.hits < killHits) {
            data.type = 'swing';
        }
        else if(result < 1 && this.state.hits < killHits) {
            data.type = 'pinataWins';
        }

        // Send data to socket admin channel only once (player 0) and when game is playing
       this.sendDataAdmin(data)
    }

    batHits() {
        // Data package to send to admin channel
        const result = this.state.hits + 1;
        const data = {
            roomId: this.props.globalData.gameId,
            result: result,
            type: null
        }

        // determine if you have won or lost the game at this point
        if(result < killHits && this.state.swings <= avoidHits) {
            data.type = 'hit';
        }
        else if(result >= killHits && this.state.swings <= avoidHits) {
            data.type = 'batWins';
        }

        this.sendDataAdmin(data)
    }

    // send data to socket admin channel only once (player 0) and when game is playing
    sendDataAdmin(data) {
        if(this.props.globalData.playerSelection == 0 && this.state.gameStart) {
            this.props.socket.emit('admin', data);
        }
    }

    // Declare winner of game data comes from socket
    declareWinner(data) {
        if(data.type == 'destroyBat') {
            console.log('destroy bat.... PINATA WINS');
        }
        else if(data.type == 'destroyPinata') {
            console.log('destroy pinata.... BAT WINS')
            candyTime = true;
        }
    }

    // Sets new states from when receiving data from socket admin channel and acts as middle ground from admin socket channel
    setNewStateAdmin(data) {
        switch(data.type) {
            case 'swing':
                this.setState({swings: data.result});
                break;

            case 'hit':
                this.setState({hits: data.result});
                break;

            case 'gameStart':
                this.setState({gameStartCount: this.state.gameStartCount + data.result});
                if(this.state.gameStartCount == 2) {
                    this.state.gameStart = true;
                }
                break;

            case 'pinataWins':
                this.state.gameStart = false;
                const dataPinataWins = {
                    roomId: this.props.globalData.gameId,
                    result: null,
                    type: 'destroyBat'
                }           

                this.props.socket.emit('declareWinner', dataPinataWins);
                break;

            case 'batWins':
                this.state.gameStart = false;
                const dataBatWins = {
                    roomId: this.props.globalData.gameId,
                    result: null,
                    type: 'destroyPinata'
                }
                this.props.socket.emit('declareWinner', dataBatWins)
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

    openModal() {this.setState({modalIsOpen: true});}
    closeModal() {this.setState({modalIsOpen:false});}


    handleDrawerToggle () { this.setState({drawerOpen: !this.state.drawerOpen});}

    handleDrawerClose() { this.setState({drawerOpen: false});}

    openBitlySnackbar() { this.setState({bitlyOpen: true});}

    closeBitlySnackbar() {this.setState({bitlyOpen: false});}

    render() {

        return (
            <div className="container game-wrapper">
                <div className="row">
                    { /* --player header: Left corner-- */}
                    <div className="col s3 playerHeader valign-wrapper">
                        <img style={{float:"left"}} className="circle responsive-img" src="/img/bird-sm.png" />
                        <h4>{this.props.globalData.playerName}</h4>
                    </div>
                    { /* --GAME TITLE-- */}
                    <div className="col s6">
                      <h1 className="center-align">Piñata Smash</h1>
                    </div>
                    { /* --player header: Right corner-- */}
                    <div className="col s3 playerHeader valign-wrapper">
                        <img style={{float:"right", right:0, position:"relative", width:"45px"}} className="circle responsive-img" src="/img/arm125.png" />
                        <h4 style={{float:"right"}}>{this.props.globalData.playerName}</h4>
                    </div>
                </div>

                {/* --- Drawer & Drawer Button ---*/}
                <div className="row">
                    <div className="col s1">
                        <Paper style={{display: "block", marginLeft:"auto", marginRight:"auto", width:70, height:70}} zDepth={2} circle={true}>
                            <IconButton
                                tooltip="Chat"
                                tooltipPosition="top-center"
                                iconStyle={{width:45, height:45}}
                                onClick={this.handleDrawerToggle}
                                >
                                <CommunicationChatBubble />
                            </IconButton>
                        </Paper>

                        {/*Modal button*/}
                        <Paper style={{marginTop:30, display: "block", marginLeft:"auto", marginRight:"auto", width:70, height:70}} zDepth={2} circle={true}>
                            <IconButton
                                tooltip="QR Code"
                                tooltipPosition="top-center"
                                className="iconBtn"
                                onClick={this.openModal}
                                >
                                <img  src='img/qr-code-icon.svg' />
                            </IconButton>
                        </Paper>

                        {/* --- bitly - shortened urls ---*/}
                        <Paper style={{marginTop:30, display: "block", marginLeft:"auto", marginRight:"auto", width:70, height:70}} zDepth={2} circle={true}>
                            <IconButton
                                tooltip="URL Connect"
                                tooltipPosition="top-center"
                                className="iconBtn"
                                onClick={this.openBitlySnackbar}
                                >
                                <img  src='img/phone-web-icon.svg' />
                            </IconButton>
                        </Paper>

                        { /* ---- Drawer / Chat Messages---- */}
                        <Drawer
                            open={this.state.drawerOpen}
                            docked={false}
                            width={350}
                            onRequestChange={(open) => this.setState({open})}
                            >
                            <FlatButton
                                label="Close"
                                style={{float:"right"}}
                                onClick={this.handleDrawerClose}
                                />
                                <div className="row">
                                <div className="chat-wrapper col s12">
                                    <Card>
                                        <CardHeader
                                            title="Chat Messages"
                                        />
                                        <List id="messages" className="list-unstyled" style={{paddingLeft:"10px", paddingRight:"10px"}}>
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
                                    </Card>
                                </div>
                            </div>
                        </Drawer>
                    </div>
                    { /* --scoreboard-- */}
                    <div className="col s11">
                      <Scoreboard swings={this.state.swings} hits={this.state.hits}/>
                    </div>
                </div>

                {/* ------ Connect Device ------*/}
                {/* ---- qr code ----*/}
                <div className="row">
                    <div className="col s1">

                      {/*
                        <a target="_blank"
                            href={`/control-device/${this.props.globalData.gameId}/${this.props.globalData.playerId}/${this.props.globalData.playerSelection}`}>go here to connect control device: <br/>
                            {`/control-device/${this.props.globalData.gameId}/${this.props.globalData.playerId}/${this.props.globalData.playerSelection}`}
                        </a>
                      */}

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
                        {/*
                        <a target="_blank"
                            href={`/control-device/${this.props.globalData.gameId}/${this.props.globalData.playerId}/${this.props.globalData.playerSelection}`}>go here to connect control device: <br/>
                            {`/control-device/${this.props.globalData.gameId}/${this.props.globalData.playerId}/${this.props.globalData.playerSelection}`}
                        </a>
                        */}
                    </div>
                </div>
                <div className="row">
                  <div className="col s1">

                    <Snackbar
                      open={this.state.bitlyOpen}
                      message={"Connect: " + this.state.bitlyURL}
                      onRequestClose={this.closeBitlySnackbar}
                    />
                  </div>
                </div>
                    <div id="script-container">
                    </div>

             <div>
             <Link to="#" id="batSwings" className="btn btn-primary" onClick={this.batSwings} style={{display:"block"}}>bat swings</Link>

             <Link to="#" id="batHits" className="btn btn-primary" onClick={this.batHits} style={{display:"block"}}>bat hits</Link>
         </div>
            </div>
        );
    }
}
