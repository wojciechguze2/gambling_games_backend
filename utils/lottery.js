const db = require("../models");

/**
 * @param {number} gameId - Game identity.
 * @returns {object} - Game value as an object
 */
const getRandomGameResult = async (gameId) => {
    if (!gameId) {
        return res.status(404).json({ error: 'Game does not exist.' });
    }

    const game = await db.Game.findByPk(gameId, {
        include: [
            {
                model: db.GameValue,
            }
        ],
    });

    if (!game) {
        return res.status(404).json({ error: 'Game does not exist.' });
    }

    const gameValues = game['GameValues'];
    const totalChance = gameValues.reduce((acc, value) => acc + value.chance, 0);
    const randomValue = Math.random() * totalChance;
    let cumulativeChance = 0;

    for (const value of gameValues) {
        cumulativeChance += value.chance;

        if (randomValue < cumulativeChance) {
            return value;
        }
    }

    throw new Error('Unable to determine game result.')
}

module.exports = {
    getRandomGameResult,
};