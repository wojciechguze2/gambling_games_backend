const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { decodeRequestValue } = require('../utils/securityHelper')
const {
    USER_PASSWORD_BCRYPT_SALT,
    JWT_AUTHENTICATION_TOKEN_EXPIRES,
    USER_REGISTER_BONUS_CODE
} = require('../utils/constants');
const {
    getAccountBalance,
    addAccountBalance
} = require('../utils/user')

const register = async (req, res) => {
    const {
        username,
        initiallyEncryptedPassword
    } = req.body;

    if (!username || !initiallyEncryptedPassword) {
        return res.status(400).json({ error: 'Validation error' });
    }

    const existingUser = await db.User.findOne({ where: { username } });

    if (existingUser) {
        return res.status(409).json({ error: 'User already exists' });
    }

    const decodedPassword = decodeRequestValue(initiallyEncryptedPassword)

    if (!decodedPassword) {
        return res.status(400).json({ error: 'Password is required. '})
    }

    const encryptedPassword = await bcrypt.hash(
        decodedPassword,
        USER_PASSWORD_BCRYPT_SALT
    );

    const user = await db.User.create({
        username: username,
        password: encryptedPassword,
    });

    user.token = jwt.sign(
        {
            user_id: user.id,
            username
        },
        process.env.JWT_SECRET,
        {
            expiresIn: JWT_AUTHENTICATION_TOKEN_EXPIRES,
        }
    );

    const registerBonus = await db.UserBonus.findOne({where: { code: USER_REGISTER_BONUS_CODE }})

    if (registerBonus && registerBonus.baseValue) {
        user.accountBalance += registerBonus.baseValue
    }

    await user.save()

    return res.status(201).json(user);
};

const login = async (req, res) => {
    const {
        username,
        initiallyEncryptedPassword
    } = req.body;

    if (!username || !initiallyEncryptedPassword) {
        return res.status(400).json({ error: 'Validation error' });
    }

    const user = await db.User.findOne({ where: { username } });

    if (!user) {
        return res.status(403).json({ error: 'Invalid credentials' });
    }

    const decodedPassword = decodeRequestValue(initiallyEncryptedPassword)

    if (!decodedPassword) {
        return res.status(400).json({ error: 'Password is required.' });
    }

    if (!user.active) {
        return res.status(403).json({ error: 'Account is inactive' });
    }

    const passwordMatches = await bcrypt.compare(
        decodedPassword,
        user.password
    )

    if (!passwordMatches) {
        return res.status(403).json({ error: 'Invalid credentials' });
    }

    user.token = jwt.sign(
        {
            user_id: user.id,
            username
        },
        process.env.JWT_SECRET,
        {
            expiresIn: JWT_AUTHENTICATION_TOKEN_EXPIRES,
        }
    );

    await user.save()

    return res.status(200).json(user);
};

const getUser = async (req, res) => {
    const userId = req.user.user_id

    if (!userId) {
        return res.status(401).json({ error: 'Authentication error.' });
    }

    const user = await db.User.findByPk(userId, {
        include: [
            {
                model: db.GameHistory,
                limit: 10,
                order: [['playDate', 'DESC']],
                include: [
                    {
                        model: db.Game,
                        attributes: ['name']
                    },
                    {
                        model: db.Currency,
                        attributes: ['name']
                    }
                ],
            },
        ],
    });

    if (!user) {
        return res.status(401).json({ error: 'Authentication error.' });
    }

    return res.status(200).json(user)
};

const deleteUser = async (req, res) => {
    const userId = req.user.user_id

    if (!userId) {
        return res.status(401).json({ error: 'Authentication error.' });
    }

    const user = await db.User.findByPk(userId);

    if (!user) {
        return res.status(401).json({ error: 'Authentication error.' });
    }

    user.active = false
    await user.save()

    return res.status(200).json({ message: 'Deleted successfully' })
}

const getUserAccountBalance = async (req, res) => {
    const userId = req.user.user_id

    if (!userId) {
        return res.status(401).json({ error: 'Authentication error.' });
    }

    const accountBalance = await getAccountBalance(userId)

    if (accountBalance === false) {
        return res.status(401).json({ error: 'Authentication error.' });
    }

    return res.status(200).json(accountBalance)
}

const addUserAccountBalance = async (req, res) => { // todo: (currencies, different values, maybe payments)
    const userId = req.user.user_id
    const { value } = req.body

    if (!userId) {
        return res.status(401).json({ error: 'Authentication error.' });
    }

    if (!value) {
        return res.status(400).json({ error: 'Invalid value.' });
    }

    const accountBalance = await addAccountBalance(userId, value)

    if (accountBalance === false) {
        return res.status(401).json({ error: 'Authentication error.' });
    }

    return res.status(200).json(accountBalance)
}

const testToken = async (req, res) => {
    res.status(201).json();
};

module.exports = {
    register,
    login,
    getUser,
    deleteUser,
    addUserAccountBalance,
    getUserAccountBalance,
    testToken,
};