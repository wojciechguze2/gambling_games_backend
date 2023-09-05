const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const jwtAuthentication = require('../middleware/authentication');

router.get('/user', jwtAuthentication, userController.getUser);
router.get('/user/account-balance', jwtAuthentication, userController.getUserAccountBalance);
router.patch('/user/account-balance/add', jwtAuthentication, userController.addUserAccountBalance);
router.post('/user/register', userController.register);
router.post('/user/login', userController.login);
// router.get('/user/token/test', jwtAuthentication, userController.testToken);

module.exports = router;