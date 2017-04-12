'use strict';

const router = require('express').Router();
const Models = require('../models');

const PlayerController = {
    createPlayer: (req, res) => {
        const newPlayer = new Models.Player({
            name: req.params.playername
        });
        newPlayer.save((error, player) => {
            if (error) {
                throw new Error(error);
            } else {
                console.log(player);
                res.send(player)
            }
        });
    },
    viewPlayers: function (req, res) {
        Models.Player.find({},
            (error, players) => {
                res.send(players);
            }
        )
    },
    fetchOne: (req, res) => {
        Models.Player.findOne(
            {name: req.params.name},
            (error, player) => {
                console.log('Fetch', player)
                res.send(player);
        });
    }

};

module.exports = PlayerController;