const gameController = require('../controllers/gameController.js');
const router = require('express').Router();

router.get('/', (req, res, next) => {
    gameController.viewActiveGames(req, res);
});

router.post('/join/:gameid', (req, res) => {
    console.log(req.params)
    gameController.joinGame(req, res);
});

router.post('/create/:playerid', (req, res) => {
    console.log(req.params)
    gameController.createGame(req, res);
})

router.get('complete/:gameid', (req, res) => {
    console.log(req.params)
    if (req.params.gameid) {
        gameController.completeGame(req.params.gameid)
    } else console.log('Nope.');
});

module.exports = router;
