const db = require('../models')

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
 * @param res - Response.
 * @param {number|null} userId - User identity.
 * @param {number} gameId - Game identity.
 * @param {boolean} demo - Is demo (whether to save the result).
 * @param {number|null} costValue - Cost value (gameBaseValue * currency multiplier).
 * @param {number} gameMultiplier - Game cost && value multiplier
 * @returns {GameValue} - Game value as an object
 */
const playGame = async (
    res,
    userId,
    gameId,
    demo = false,
    costValue = null,
    gameMultiplier = 1
) => {
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
    const currency = await db.Currency.findByPk(gameResult.currencyId)

    if (!currency) {
        return res.status(400).json({ error: 'Wrong currency.' });
    }

    let userAccountBalance

    const winCostValue = game.costBaseValue * currency.multiplier * gameMultiplier  // todo: check currency multiplier
    const winValue = gameResult.value * currency.multiplier * gameMultiplier
    const accountBalanceAddition = winValue - winCostValue

    if (!demo) {
        if (costValue !== winCostValue) {
            return res.status(400).json({ error: 'Game costs dont match.' })
        }

        if (!userId) {
            return res.status(401).json({ error: 'Authentication error.' });
        }

        const user = await db.User.findByPk(userId)

        if (!user) {
            return res.status(401).json({ error: 'Authentication error.' });
        }

        const gameTransaction = await db.sequelize.transaction()

        if (winCostValue > user.accountBalance) {
            return res.status(409).json({ error: 'Account balance is too low' })
        }

        try {
            user.accountBalance += accountBalanceAddition

            await user.save({transaction: gameTransaction})

            await db.GameHistory.create({
                userId,
                gameId,
                costBaseValue: game.costBaseValue,
                winBaseValue: gameResult.value,
                winCurrencyId: gameResult.currencyId,
                playDate: new Date(),
                gameMultiplier
            }, {transaction: gameTransaction});

            await gameTransaction.commit()
        } catch (err) {
            console.error(err)
            await gameTransaction.rollback()

            return res.status(500).json('Undefined gameTransaction error')
        }

        userAccountBalance = user.accountBalance
    }

    return res.status(200).json({
        result: gameResult,
        currencyName: currency.name,
        isWin: winValue >= winCostValue,
        userAccountBalance
    })
}

const getGameIdByCode = async (gameCode) => {
    if (!gameCode) {
        return null
    }

    const game = await db.Game.findOne({
        where: { code: gameCode },
        attributes: ['id']
    })

    if (!game) {
        return null
    }

    return game.id
}

module.exports = {
    playGame,
    getGameIdByCode
};