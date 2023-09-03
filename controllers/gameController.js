const db = require("../models")

const getGames = async (req, res) => {
    const games = await db.Game.findAll({
        include: [
            {
                model: db.GameValue
            }
        ],
    });

    res.status(200).json(games);
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

const updateGame = async (req, res) => {
    const {
        gameId,
        gameName,
        gameValues
    } = req.body;

    const game = await db.Game.findByPk(gameId);

    if (!game) {
        return res.status(404).json({ error: 'Game does not exist.' });
    }

    if (gameName) {
        game.name = gameName;
        await game.save();
    }

    await db.GameValue.destroy({ where: { gameId } });

    await Promise.all(
        gameValues.map(async (value) => {
            await db.GameValue.create({
                value: value.value,
                chance: value.chance,
                gameId: gameId,
            });
        })
    );

    res.status(200).json(game);
};

const deleteGame = async (req, res) => {
    const { gameId } = req.query;

    const game = await db.Game.findByPk(gameId)

    if (!game) {
        return res.status(404).json({ error: 'Game does not exist.' });
    }

    await game.destroy();

    res.status(204).send();
};

module.exports = {
    getGames,
    createGame,
    updateGame,
    deleteGame
};