const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.get('/games', gameController.getGames);
router.post('/games', gameController.createGame);
router.delete('/games', gameController.deleteGame);
router.patch('/games', gameController.updateGame);

module.exports = router;