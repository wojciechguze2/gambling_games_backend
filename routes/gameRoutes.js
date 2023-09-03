const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.get('/games', gameController.getGames);
router.post('/games', gameController.createGame);
router.delete('/games', gameController.deleteGame);
router.patch('/games', gameController.updateGame);
router.get('/games/random', gameController.getRandomGame);
router.get('/games/:gameId', gameController.getGame);
router.get('/games/:gameId/result', gameController.getGameResult);

module.exports = router;