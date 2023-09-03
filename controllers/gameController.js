const db = require("../models")

const getGames = async (req, res) => {
    const games = await db.Game.findAll({
        include: [
            {
                model: db.GameValue
            }
        ],
    });

    res.json(games);
};

const createGame = async (req, res) => {
    const {
        gameName,
        gameValues
    } = req.body;

    const game = await db.Game.create({
        name: gameName,
    });

    await Promise.all(
        gameValues.map(async (value) => {
            await db.GameValue.create({
                value: value.value,
                chance: value.chance,
                gameId: game.id,
            });
        })
    );

    res.status(201).json(game);
};

module.exports = {
    getGames,
    createGame,
};