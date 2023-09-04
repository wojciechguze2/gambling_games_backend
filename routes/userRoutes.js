const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// const jwtAuthentication = require('../middleware/authentication');

router.post('/user/register', userController.register);
router.post('/user/login', userController.login);
// router.get('/user/token/test', jwtAuthentication, userController.testToken);

module.exports = router;