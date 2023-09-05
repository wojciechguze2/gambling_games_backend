const db = require('../models')

const getAccountBalance = async (userId) => {
    const user = await db.User.findByPk(userId, {
        attributes: ['accountBalance']
    })

    return user.accountBalance
}

module.exports = {
    getAccountBalance
};