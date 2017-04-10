import React from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import helpers from "./utils/helpers";


export default class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeGames: [], 
      playerId: sessionStorage.getItem('player-id') || null
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    helpers.viewActiveGames().then(response => {
      console.log(JSON.stringify(response.data));
      this.setState({ activeGames: response.data });
    });
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick(event) {
    // event.preventDefault();
    console.log(this.state.playerId)
    if (this.state.playerId !== null) {
      helpers.createNewGame(this.state.playerId).then(response => {
        // Need a way to route to game
        // Router.push('/game')
        console.log(response)
      });
    }
  }

  // handleChange(event) {
  //   var newState = {};
  //   newState[event.target.id] = event.target.value;
  //   this.setState(newState);
  // }

  handleJoin(event) {
    const gameId =  event.target.dataset.gameid || null;
    if (gameId) {
      sessionStorage.setItem('room-id', gameId);
      helpers.joinGame(gameId);
    }
  }

  displayGames() {
      return this.state.activeGames.map((game, i) => {
        // Each Game
        return (
          <h4 >
            <Link to="/game" data-gameid={game._id} onClick={this.handleJoin}>Game with {game.players}</Link>
          </h4>
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
                  {this.displayGames()}
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title text-center">Controls</h3>
              </div>
              <div className="panel-body">
                  <Link to="/game" className="btn btn-primary" onClick={this.handleClick}>Create New Game</Link>
              </div>
            </div>
          </div>


          
        </div>
      </div>
    );
  }
}

// Export the component back for use in other files
// export default { Lobby };
// module.exports = Lobby;