'use strict';

const router = require('express').Router();
const Models = require('../models');

const gameController = {
    viewActiveGames: (req, res) => {
      Models.Game.find({isCompleted: false})
      // .sort(createdAt: -1)
      .populate('player')
      .exec((error, games) => {
          error ?
          console.log(error) : 
          res.send(games)
      });
    },
    joinGame: (req, res) => {
      console.log('Controller joinGame', req.params)
      Models.Game.findOneAndUpdate(
          {_id: req.params.gameid},
          { $addToSet: {
              'player': req.params.playerid
          }}
      ).exec((err, doc) => {
            console.log(doc)
          err ? console.log(err) : 
          res.send(doc);
          
      });
    },
    createGame: (req, res) => { 
      console.log('Create game', req)
      const newGame = new Models.Game();
      console.log(newGame, req.params.playerid)
      newGame.player.push(req.params.playerid);
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