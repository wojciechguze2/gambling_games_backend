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

module.exports = {
    getGames,
    createGame,
    updateGame,
    deleteGame,
    getRandomGame
};