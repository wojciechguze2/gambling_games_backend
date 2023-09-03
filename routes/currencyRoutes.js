const express = require('express');
const router = express.Router();
const currencyController = require('../controllers/currencyController');

router.get('/currency', currencyController.getCurrencies);
router.get('/currency/:currencyId', currencyController.getCurrency);

module.exports = router;