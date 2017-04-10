'use strict';

const router = require('express').Router();
const Models = require('../models');

const gameController = {
    viewActiveGames: (req, res) => {
      Models.Game.find({isCompleted: false})
      // .sort(createdAt: -1)
      .populate('Player')
      .exec((error, games) => {
          error ?
          console.log(error) :
          res.send(games)
      });
    },
    joinGame: (req, res) => {
      Models.Game.findOneAndUpdate(
          {_id: req.params.gameid},
          { $push: {
              'players': req.params.playerid
          }}
      ).exec((err, doc) => {
          err ? console.log(err) :
          res.send(doc)
      });
    },
    createGame: (req, res) => { 
      const newGame = new Models.Game();
      console.log(newGame)
      newGame.players.push(req.params.playerid);
      newGame.save((error, game) => {
        if (error) {
          console.log(error);
        } else {
          res.send(game)
        }
      });
    },

    completeGame: (req, res) => { Models.Game.find }

};

module.exports = gameController;