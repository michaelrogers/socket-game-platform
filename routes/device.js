const deviceController = require('../controllers/deviceController.js');
const router = require('express').Router();

router.get('/:gameId/:playerId/:playerSelection', (req, res) => {
    deviceController.connectPhone(req, res);
});

module.exports = router;