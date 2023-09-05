const db = require('../models')

const addAccountBalance = async (userId, value) => {  // todo: (currencies, different values, maybe payments in the future)
    const user = await db.User.findByPk(userId)

    user.accountBalance += value

    await user.save()

    return user.accountBalance
}

const getAccountBalance = async (userId) => {
    const user = await db.User.findByPk(userId, {
        attributes: ['accountBalance']
    })

    return user.accountBalance
}

module.exports = {
    addAccountBalance,
    getAccountBalance
};