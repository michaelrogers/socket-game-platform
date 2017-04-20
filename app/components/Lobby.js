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
      playerFeed: [],
      playerCount: 0
    };
    this.createGame = this.createGame.bind(this);
    this.removeGame = this.removeGame.bind(this);
    this.handleJoin = this.handleJoin.bind(this);
    this.updatePlayerCount = this.updatePlayerCount.bind(this);

    console.log('Lobby', this.props);
  }


  componentDidMount() {
    helpers.viewActiveGames()
      .then(response => {
        this.setState({ activeGames: response.data });
      });

    this.props.socket.on('player:count', this.updatePlayerCount);
  }

  updatePlayerCount(playerCount) {
    this.setState({playerCount: playerCount});
  }

  // Called by create game button
  createGame(event) {
    console.log('Create game', this.props.globalData.playerId, this.props)
    if (this.props.globalData.playerId !== null) {
      helpers.createNewGame(this.props.globalData.playerId)
        .then(response => {
          this.props.setMainState({
            playerSelection: 0,
            gameId: response._id,
          });
        });
    }
  }

  removeGame(gameId) {
    helpers.removeGame(gameId)
    .then(response => console.log(response));
  }

  handleJoin(event) {
    const gameId = event.currentTarget.dataset.gameid || null;
    if (gameId) {
      this.props.setGameId(gameId)
      // sessionStorage.setItem('room-id', gameId);
      helpers.joinGame(gameId, this.props.globalData.playerId)
      .then(response => {
        console.log(response)
        Array.from(response.player)
        .map((player, i) => {
          console.log(player, this.props.globalData.playerId, player == this.props.globalData.playerId)
          if (player == this.props.globalData.playerId) {
              this.props.setMainState({
                playerSelection: i,
                gameId: gameId
              });
            // sessionStorage.setItem('player-selection', i);
            console.log('Player is', i)
          }
        });

      });
    }
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
          <Link
            to="/game"
            key={game._id}
            data-gameid={game._id}
            onClick={this.handleJoin}
            className="list-group-item">
            <a href="/" className="pull-right" onClick={(e) => {e.stopPropagation(); this.removeGame(game._id)}}>x</a>
            <h4 className="h4">Piñata game</h4>
            <span>Current players:</span>
            {this.displayPlayers(game.player)}
          </Link>
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
            </div>
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
                <div><h4>Players Online: <span>{this.state.playerCount}</span></h4></div>
                <h4>Playing as: {this.props.globalData.playerName}</h4>
                <Link to="/game" className="btn btn-primary" onClick={this.createGame}>Create New Game</Link>
              </div>
            </div>

            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title text-center">Player Feed</h3>
              </div>
              <div className="panel-body">
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
