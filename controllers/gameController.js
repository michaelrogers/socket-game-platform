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
          }
          }, { new: true }
      ).exec((err, doc) => {
            console.log(doc)
          err ? console.log(err) : 
          res.send(doc);
          
      });
    },
    createGame: (req, res) => { 
      console.log('gameController: Create game')
      const newGame = new Models.Game();
      newGame.player.push(req.params.playerid);
      newGame.save((error, game) => {
        if (error) {
          console.log(error);
        } else {
          res.send(game)
        }
      });
    },

    removeGame: (req, res) => {
      console.log('Controller remove', req.params)
      Models.Game.findByIdAndRemove(req.params.gameid)
      .exec((err, doc) => {
            console.log(doc)
          err ? console.log(err) : 
          res.send(doc);
          
      });
    },

    completeGame: (req, res) => { Models.Game.find }

};

module.exports = gameController;