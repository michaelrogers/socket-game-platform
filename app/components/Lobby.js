import React from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import helpers from "./utils/helpers";
const appendScript = (scriptArray, selector) => {
  scriptArray.map(scriptPath => {
    const script = document.createElement('script');
    script.src = scriptPath;
    document.querySelector(selector).appendChild(script);
  });
};

export default class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeGames: [],
      // playerId: sessionStorage.getItem('player-id') || null,
      playerCount: 0
    };
    this.createGame = this.createGame.bind(this);
    this.handleJoin = this.handleJoin.bind(this);
    console.log('Lobby', this.props);
  }

  componentDidMount() {
    helpers.viewActiveGames()
      .then(response => {
        this.setState({ activeGames: response.data });
      });
      console.log(this.props)

  }


  // Called by create game button
  createGame(event) {
    console.log('Create game', this.props.globalData.playerId, this.props)
    if (this.props.globalData.playerId !== null) {
      helpers.createNewGame(this.props.globalData.playerId)
        .then(response => {
          // Need a way to route to game
          this.props.setGameId(response._id)
        });
    }
  }

  handleJoin(event) {
    const gameId = event.currentTarget.dataset.gameid || null;
    if (gameId) {
      sessionStorage.setItem('room-id', gameId);
      helpers.joinGame(gameId, this.props.globalData.playerId);
    }
    this.props.setGameId(gameId)
  }

  displayPlayers(players) {
    return players.map(player => {
      return <span key={player._id}> {player.name}</span>
      
    });
  }

  displayGames() {
    return this.state.activeGames.map((game, i) => {
      // Each Game
      return (
        // <h4 key={game._id} >
          <Link
            to="/game"
            key={game._id}
            data-gameid={game._id}
            onClick={this.handleJoin}
            className="list-group-item">
            <span>Game with:</span> 
             {this.displayPlayers(game.player)}
          </Link>
        // </h4>
      )
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron">
            <h2>Welcome to the Socket-Platform-Game</h2>
            <p><em>A journey through the whimsical world of React Routing</em></p>
            `    </div>
          <div className="col-md-8">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title text-center">Active Games</h3>
              </div>
              <div className="panel-body">
                <div className="list-group">
                  {this.displayGames()}
                  </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title text-center">Controls</h3>
              </div>
              <div className="panel-body">
                <div><h4>Players Online: <span>{this.props.globalData.playerCount}</span></h4></div>
                <h4>Playing as: {this.props.globalData.playerName}</h4>
                <Link to="/game" className="btn btn-primary" onClick={this.createGame}>Create New Game</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}