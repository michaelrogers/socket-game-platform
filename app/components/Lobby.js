import React from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
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
          linkButton
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
        <div className="row">
          <div className="col m8">
            <List>
              <Subheader>Games</Subheader>
              {this.displayGames()}
            </List>
          </div>
          <div className="col m4">
            <List>
              <Subheader>Controls</Subheader>
              <ListItem
                primaryText={"Players Online: " + this.state.playerCount}
                primaryText={"Playing as: " + this.props.globalData.playerName}
              >
                <RaisedButton 
                  label="Primary" 
                  primary={true} 
                  containerElement={
                    <Link 
                      to="/game" 
                      onClick={this.createGame}
                    >
                      Create New Game
                    </Link>
                  }
                   />
                
              </ListItem>
            </List>
          </div>
        </div>
    );
  }
}
