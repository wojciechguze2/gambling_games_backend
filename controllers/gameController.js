const db = require('../models');
const { playGame } = require('../utils/lottery');

const getGames = async (req, res) => {
    const games = await db.Game.findAll({
        include: [
            {
                model: db.GameValue,
            }
        ],
    });

    res.status(200).json(games);
};

const createGame = async (req, res) => {
    const {
        gameName,
        gameCostBaseValue,
        gameValues
    } = req.body;

    const game = await db.Game.create({
        name: gameName,
        costBaseValue: gameCostBaseValue,
    });

    await Promise.all(
        gameValues.map(async (value) => {
            await db.GameValue.create({
                value: value.value,
                chance: value.chance,
                gameId: game.id,
                currencyId: value.currencyId
            });
        })
    );

    res.status(201).json(game);
};

const updateGame = async (req, res) => {
    const {
        gameId,
        gameName,
        gameCostBaseValue,
        gameValues
    } = req.body;

    const game = await db.Game.findByPk(gameId);

    if (!game) {
        return res.status(404).json({ error: 'Game does not exist.' });
    }

    if (gameName || gameCostBaseValue) {
        if (gameName) {
            game.name = gameName;
        }

        if (gameCostBaseValue) {
            game.costBaseValue = gameCostBaseValue;
        }

        await game.save();
    }

    await db.GameValue.destroy({ where: { gameId } });

    await Promise.all(
        gameValues.map(async (value) => {
            await db.GameValue.create({
                value: value.value,
                chance: value.chance,
                gameId: gameId,
                currencyId: value.currencyId
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

    await db.GameValue.destroy({ where: { gameId } });
    await game.destroy();

    res.status(204).send();
};

const getRandomGame = async (req, res) => {
    const gameCount = await db.Game.count();

    if (gameCount === 0) {
        return res.status(404).json({ error: 'Games not found.' });
    }

    // Wygeneruj losowy indeks gry
    const randomIndex = Math.floor(Math.random() * gameCount);

    // Pobierz jedną losową grę
    const randomGame = await db.Game.findOne({
        include: [
            {
                model: db.GameValue,
            },
        ],
        offset: randomIndex,
    });

    res.status(200).json(randomGame);
}

const getGame = async (req, res) => {
    const { gameId } = req.params;

    const game = await db.Game.findByPk(gameId, {
        include: [
            {
                model: db.GameValue,
                include: [
                    {
                        model: db.Currency,
                        attributes: ['name']
                    }
                ]
            }
        ],
    });

    if (!game) {
        return res.status(404).json({ error: 'Game does not exist.' });
    }

    res.status(200).json(game);
}

const getGameResult = async (req, res) => {
    const { gameId } = req.params;
    const userId = req.user.user_id

    const randomGameResult = await playGame(userId, gameId);

    return res.status(200).json(randomGameResult);
}

module.exports = {
    getGames,
    createGame,
    updateGame,
    deleteGame,
    getRandomGame,
    getGame,
    getGameResult
};