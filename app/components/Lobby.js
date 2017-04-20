import React from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';


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
        <ListItem
          key={i}
          containerElement={
            <Link
              to="/game"
              key={game._id}
              data-gameid={game._id}
              onClick={this.handleJoin}>
            </Link>
          }
          rightIcon={<a href="/" onClick={(e) => {e.stopPropagation(); this.removeGame(game._id)}}>x</a>}
        >
        
          <h5>Piñata game</h5>
          
          <span>Current players:</span>
          {this.displayPlayers(game.player)}
        </ListItem>
      )
    });
  }

  render() {
    return (
      <div className="container lobby-wrapper">
        <div className="row">
          <div className="col s12 m8">
              <div className="row">
                <div className="col m6">
                  <Card>
                    <CardMedia
                      overlay={<CardTitle title="Pinata" subtitle="Destroy the pinata, or survive the bat" />}
                    >
                      <img src="img/game.png" />
                    </CardMedia>
                  </Card>
                </div>
                <div className="col m6">
                  <Card>
                    <CardMedia
                      overlay={<CardTitle title="Game 2" />}
                    >
                      <img src="img/coming-soon.jpg" />
                    </CardMedia>
                  </Card>
                </div>
              </div>
          </div>
          <div className="col s8 m4">
            <Card>
              <CardHeader
                title="Games"
                subtitle="Which do you want to play?"
              />
              <RaisedButton 
                  fullWidth={true}
                  label="Create New Game" 
                  primary={true} 
                  onClick={this.createGame}
                  containerElement={
                    <Link 
                      to="/game" 
                      >
                    </Link>
                  }
                   />
              <List>
                {this.displayGames()}
              </List>
            </Card>
          </div>
          <div className="col s4 m4">
            <div>
              <h3>Controls</h3>
              <div className="collection">
                <h4 className="collection-item">Players Online:  {this.state.playerCount} </h4>
                <h5 className="collection-item">Playing as:  {this.props.globalData.playerName} </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
