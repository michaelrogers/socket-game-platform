// Include React
import React from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Navigation } from './config/routes';

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
        activeGames: [], 
        playerId: sessionStorage.getItem('player-id') || null,
        playerName: null,
        playerCount: 0,
        gameId: null
    };
    // this.handleClick = this.handleClick.bind(this);
    this.updatePlayerCount = this.updatePlayerCount.bind(this);
    this.setGameId = this.setGameId.bind(this);
    this.setPlayerInfo = this.setPlayerInfo.bind(this);

    
  }
  updatePlayerCount(playerCount) { 
    this.setState({playerCount: playerCount}); 
  }

  setPlayerInfo(playerName, playerId) {
    console.log('Main setPlayerInfo', playerName, playerId)
    this.setState({
      playerName: playerName,
      playerId: playerId
    });
  }

  componentDidMount() {
    // appendScript(["/script/connection.js"], '.script-container');
    socket.on('player:count', this.updatePlayerCount);

  }

  setGameId(gameId) {
    this.setState({gameId: gameId})
  }


  render() {
    // console.log(this.state)
    // const childrenWithProps = React.cloneElement(this.props.children, { globalData: this.state});
    return (
      <div className="starter-template">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              
              <Router>
                <div>
                  <Navigation/>
                  <Route path="/" exact render={ () => (
                    <Lobby 
                      globalData={this.state}
                      setGameId={this.setGameId}
                    />
                  )}/>
                  <Route path="/game" render={ () => (
                    <Game 
                      globalData={this.state}
                      socket={socket}
                    />
                  )}/>
                  <Route path="/login" render={ () => (
                    <Login 
                      globalData={this.state}
                      setPlayerInfo={this.setPlayerInfo}
                    />
                  )}/>
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