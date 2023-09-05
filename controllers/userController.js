const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { decodeRequestValue } = require('../utils/securityHelper');
const {
    USER_PASSWORD_BCRYPT_SALT,
    JWT_AUTHENTICATION_TOKEN_EXPIRES
} = require('../utils/constants');
const { getAccountBalance } = require('../utils/user')

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

    const encryptedPassword = await bcrypt.hash(
        decodeRequestValue(initiallyEncryptedPassword),
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

    user.save()

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

    const passwordMatches = await bcrypt.compare(
        decodeRequestValue(initiallyEncryptedPassword),
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

    user.save()

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

const getUserAccountBalance = async (req, res) => {
    const userId = req.user.user_id

    if (!userId) {
        return res.status(401).json({ error: 'Authentication error.' });
    }

    const accountBalance = await getAccountBalance(userId)

    return res.status(200).json(accountBalance)
}

const testToken = async (req, res) => {
    res.status(201).json();
};

module.exports = {
    register,
    login,
    getUser,
    getUserAccountBalance,
    testToken,
};