const gameController = require('../controllers/gameController.js');
const router = require('express').Router();

router.get('/', (req, res, next) => {
    gameController.viewActiveGames(req, res);
});

router.post('/join/:gameid/:playerid', (req, res) => {
    console.log('Route join game', req.params)
    gameController.joinGame(req, res);
});

router.post('/create/:playerid', (req, res) => {
    console.log('Create player', req.params)
    gameController.createGame(req, res);
});

router.get('/complete/:gameid', (req, res) => {
    console.log('game to complete',req.params.gameid)
    if (req.params.gameid, res) {
        gameController.completeGame(req.params.gameid, res)
    } else {
        console.log('Nope.');
        res.end();
    }
});

router.post('/remove/:gameid', (req, res) => {
    console.log('Route', req.params.gameid)
     if (req.params.gameid) {
        gameController.removeGame(req, res)
    } else console.log('Nope.');
});

module.exports = router;
