const db = require("../models");

const getCurrency = async (req, res) => {
    const { currencyId } = req.params

    const game = await db.Currency.findByPk(currencyId);

    res.status(200).json(game);
}

const getCurrencies = async (req, res) => {
    const games = await db.Currency.findAll();

    res.status(200).json(games);
}

module.exports = {
    getCurrency,
    getCurrencies
};