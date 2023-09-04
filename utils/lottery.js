const db = require("../models");

/**
 * @param {Game} game - Game instance.
 * @returns {GameValue} - Game value as an object
 */
const getRandomGameResult = (game) => {
    const gameValues = game['GameValues'];
    const totalChance = gameValues.reduce((acc, value) => acc + value.chance, 0);
    const randomValue = Math.random() * totalChance;
    let cumulativeChance = 0;

    for (const gameValue of gameValues) {
        cumulativeChance += gameValue.chance;

        if (randomValue < cumulativeChance) {
            return gameValue;
        }
    }

    throw new Error('Unable to determine game result.')
}

/**
 * @param {number|null} userId - User identity.
 * @param {number} gameId - Game identity.
 * @param {boolean} demo - Is demo (whether to save the result).
 * @returns {GameValue} - Game value as an object
 */
const playGame = async (userId, gameId, demo = false) => {
    if (!gameId) {
        return res.status(404).json({ error: 'Game does not exist.' });
    }

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

    const gameResult = getRandomGameResult(game)

    if (!demo) {
        if (!userId) {
            return res.status(401).json({ error: 'Authentication error.' });
        }

        await db.GameHistory.create({
            userId,
            gameId,
            costBaseValue: game.costBaseValue,
            winValue: gameResult.value,
            winCurrencyId: gameResult.currencyId,
            playDate: new Date(),
        });
    }

    return gameResult
}

module.exports = {
    playGame
};