import React from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Scoreboard from './partials/Scoreboard';
import Pinata from './partials/Pinata';
import Motion from './partials/Motion';

// import sketch from '../scripts/sketch.js';
// import '/script/connnection.js';
const appendScript = (scriptArray, selector) => {
    scriptArray.map(scriptPath => {
        const script = document.createElement('script');
        script.src = scriptPath;
        try { document.querySelector(selector).appendChild(script);
        } catch (e) { console.log(e) }
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
    // playerInput(DataPackage.playerSelection, DataPackage.data)
    console.log(DataPackage)

    // get y and x acceleration component
    var a_y = DataPackage.data.acc.y;
    var a_x = DataPackage.data.acc.x;

    // vector magnitude and acceleration when provided with x and y acceleration components
    var mag  = Math.sqrt(Math.pow(a_y, 2) + Math.pow(a_x, 2));
    var alpha = Math.atan(a_x/(a_y))*( 180 / Math.PI);
    console.log(mag, alpha)
    updateSpring(mag, alpha)
}

export default class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        playerSelection: 1,
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
    // Functions must be bound manually with ES6 classNamees
    // this.state.gameId = sessionStorage.getItem('room-id') || null;
    this.handleChange = this.handleChange.bind(this);
    this.addChatMessage = this.addChatMessage.bind(this);
    this.displayChatMessages = this.displayChatMessages.bind(this);
    this.sendChatMessage = this.sendChatMessage.bind(this);
    this.updatePlayerSelection = this.updatePlayerSelection.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    // this.handleMotionX = this.handleMotionX.bind(this);
    // this.handleMotionY = this.handleMotionY.bind(this);
    // this.handleMotionZ = this.handleMotionZ.bind(this);
    // this.sendMotionData = this.sendMotionData.bind(this);
    // this.clearAcceleration = this.clearAcceleration.bind(this);

    console.log('Game', this.props)
}
    componentWillUnmount () {
        document.querySelector('#canvas').classList.add("hidden");

    }
    componentDidMount() {
        document.querySelector('#canvas').classList.remove("hidden");
        const scriptArray = [
            // "/lib/p5.js",
            // "/lib/p5.play.js",
            // "/script/batSwing.js",
            // "/script/sketch.js",
        ];
        // appendScript(scriptArray, '#script-container');
        console.log('Game', this.props)
        this.props.socket.emit('room',
            new DataPackage(this.props.globalData, this.state.playerSelection)
        );

        this.props.socket.on('connection-status', this.addChatMessage);
        this.props.socket.on('chat-message', this.addChatMessage);
        this.props.socket.on('input', inputEventHandler);
    }

    onKeyPress(e){
        if (this.state.playerSelection == 1 || this.state.playerSelection == 2) {
            // const acceptedKeys = [38, 37, 39, 40, 32];
            const acceptedKeys = [119, 97, 115, 100, 32];

            if (acceptedKeys.indexOf(e.charCode) !== -1) {
                e.preventDefault();
                this.props.socket.emit('input',
                    new DataPackage(
                        this.props.globalData,
                        this.state.playerSelection,

                    )
                );
            }
        }
    }


    addChatMessage(message) {
        let chatArray = this.state.messages;
        chatArray.push(message)
        this.setState({messages: chatArray});
    }


    sendChatMessage(e) {
        e.preventDefault();
        if (this.state.chatInput.length > 0) {
            // console.log('fired')
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

    // handleMotionX(e) {
    //     this.setState({
    //         acceleration: {
    //             x: parseFloat(e.target.value),
    //             y: this.state.acceleration.y,
    //             z: this.state.acceleration.z,
    //
    //         }
    //     });
    // }
    // handleMotionY(e) {
    //     this.setState({
    //         acceleration: {
    //             x: this.state.acceleration.x,
    //             y: parseFloat(e.target.value),
    //             z: this.state.acceleration.z,
    //         }
    //     });
    // }
    // handleMotionZ(e) {
    //     this.setState({
    //         acceleration: {
    //             x: this.state.acceleration.y,
    //             y: this.state.acceleration.y,
    //             z: parseFloat(e.target.value),
    //         }
    //     });
    // }
    // clearAcceleration() {
    //     this.setState({
    //         acceleration: {
    //             x: 0,
    //             y: 0,
    //             z: 0
    //         }
    //     });
    // }

    // sendMotionData(e) {
    //     e.preventDefault();
    //     // this.props.socket.emit('input', new DataPackage(data, 'acceleration'));
    //
    //     const data = {
    //         acc: {
    //             x: this.state.acceleration.x || 0,
    //             y: this.state.acceleration.y || 0,
    //             z: this.state.acceleration.z || 0
    //         }
    //     }
    //
    //     this.props.socket.emit('input',
    //         new DataPackage(
    //             this.props.globalData,
    //             this.state.playerSelection,
    //             'acceleration',
    //             data
    //         )
    //     );
    //     // this.clearAcceleration();
    // }

    displayChatMessages() {
        return this.state.messages
        .map(message => {
            return <li className="text-left">{message}</li>
        });
    }

    updatePlayerSelection(event) {
        this.setState({playerSelection: parseInt(event.target.value)})
    }
    childData(x, y) {
      console.log("-------child data function------");
      console.log(x);
      console.log(y);
      })
    }
    sendSocketInput() {
      //
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
          < Motion childData={this.childData}/>

                <input type="text" onKeyPress={this.onKeyPress} />
            <div className="input-group">
                <select name="player-selection" id="player-selection" className="form-control" onChange={this.updatePlayerSelection}>
                    <option value="1">Player 1</option>
                    <option value="2">Player 2</option>
                    <option value="0">Spectator</option>
                </select>
            </div>
            </div>
            <div className="col-xs-2">
            <div className="input-group">
                <p> gameId: {this.props.globalData.gameId}</p>
            </div>
        </div>
    </div>
    <div className="row">
	<div className="col-xs-12">
		{/*
        <div className="" id="canvas"></div>
        <Pinata/>
        */}
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
        <div id="script-container">
        {/*
        */}
            {/* <script src="//cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.8/p5.js"></script>
            <script src="/lib/p5.play.js"></script>
            <script src="/script/sketch.js"></script>
            <script src="/script/batSwing.js"> </script> */}
        </div>
{/*
*/}
        </div>
        );
    }
}
