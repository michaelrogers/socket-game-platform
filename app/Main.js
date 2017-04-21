// Include React
import React from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Navigation from './components/Navigation';

import Lobby from './components/Lobby';
import Login from './components/Login';
import Game from './components/Game';
import Error404 from './components/Error404';

//Pass socket down as props to children components
const socket = io();

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        //Player values
        playerId: sessionStorage.getItem('player-id') || undefined,
        playerName: sessionStorage.getItem('username') || undefined,
        gameId: undefined,
        playerSelection: undefined,
        //Lobby values
        // activeGames: [], 
        // playerCount: 0
    };
    // this.handleClick = this.handleClick.bind(this);
    // this.updatePlayerCount = this.updatePlayerCount.bind(this);
    this.setGameId = this.setGameId.bind(this);
    this.setPlayerInfo = this.setPlayerInfo.bind(this);
    this.setMainState = this.setMainState.bind(this);
  }

  componentDidMount() {
    //Listen to player count changes
    // socket.on('player:count', this.updatePlayerCount);
  }
  //Passed to component children to update main components state
  setMainState(stateObject) {
    this.setState(stateObject)
  }

  

  setPlayerInfo(playerName, playerId) {
    console.log('Main setPlayerInfo', playerName, playerId)
    this.setState({
      playerName: playerName,
      playerId: playerId
    });
  }

  setGameId(gameId) {
    this.setState({gameId: gameId})
  }

  render() {
    return (
      <div className="starter-template">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              
              <Router>
                <div>
                  <Navigation
                    playerName={this.state.playerName}
                    // setPlayerInfo={this.setPlayerInfo}
                  />
                  <Route path="/" exact render={ () => (
                    <Lobby 
                      globalData={this.state}
                      setGameId={this.setGameId}
                      socket={socket}
                      setMainState={this.setMainState}
                    />
                  )}/>
                  <Route path="/game" render={ () => (
                    <Game 
                      globalData={this.state}
                      socket={socket}
                      setMainState={this.setMainState}
                      
                    />
                  )}/>
                  <Route path="/login" render={ () => (
                    <Login 
                      globalData={this.state}
                      setPlayerInfo={this.setPlayerInfo}
                      setMainState={this.setMainState}
                    />
                  )}/>
                  <Route component={Error404}/>
                </div>
              </Router>
              
            </div>
          </div>
        </div>
        {/*}
            <script src="/lib/p5.js"></script>
            <script src="/lib/p5.play.js"></script>
            */}
      </div>
    );
  }
}