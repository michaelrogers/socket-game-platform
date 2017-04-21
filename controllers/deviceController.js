'use strict';

const router = require('express').Router();
const path = require('path');
const DeviceController = {
    connectPhone: (req, res) => {
        const [gameId, playerId, playerSelection] = [req.params.gameId, req.params.playerId, req.params.playerSelection]; 
        res.sendFile(path.join(__dirname, '../','public/fone.html'))
    }

};

module.exports = DeviceController;