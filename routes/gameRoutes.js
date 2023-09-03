const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.get('/games', gameController.getGames);
router.post('/games', gameController.createGame);

module.exports = router;