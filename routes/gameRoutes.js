const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const jwtAuthentication = require('../middleware/authentication');

router.get('/games', gameController.getGames);
router.get('/games/latest', gameController.getLatestGames);
router.post('/games', gameController.createGame);
router.delete('/games', gameController.deleteGame);
router.patch('/games', gameController.updateGame);
router.get('/games/random', gameController.getRandomGame);
router.get('/games/:gameCode', gameController.getGame);
router.post('/games/:gameId/result', jwtAuthentication, gameController.getGameResult);
router.get('/games/:gameId/demo', gameController.getGameDemoResult);

module.exports = router;