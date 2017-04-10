const playerController = require('../controllers/playerController.js');
const router = require('express').Router();

// router.get('/players/:playerid', (req, res) => {
//     playerController.viewSpecificPlayer(req, res);
// });

router.get('/viewall/', (req, res) => {
    playerController.viewPlayers(req, res);
});

router.get('/fetchone/:playername', (req, res) => {
    playerController.viewPlayers(req, res);
})

router.post('/create/:playername', (req, res) => {
    playerController.createPlayer(req, res);
});

module.exports = router;