const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { decodeRequestValue } = require('../utils/securityHelper');
const {
    USER_PASSWORD_BCRYPT_SALT,
    JWT_AUTHENTICATION_TOKEN_EXPIRES
} = require('../utils/constants');

const register = async (req, res) => {
    const {
        username,
        initiallyEncryptedPassword
    } = req.body;

    if (!username || !initiallyEncryptedPassword) {
        res.status(400).json({ error: 'Validation error' });
    }

    const existingUser = await db.User.findOne({ username });

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

    res.status(201).json(user);
};

const login = async (req, res) => {
    const {
        username,
        initiallyEncryptedPassword
    } = req.body;

    if (!username || !initiallyEncryptedPassword) {
        res.status(400).json({ error: 'Validation error' });
    }

    const user = await db.User.findOne({ username });

    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatches = await bcrypt.compare(
        decodeRequestValue(initiallyEncryptedPassword),
        user.password
    )

    if (!passwordMatches) {
        return res.status(401).json({ error: 'Invalid credentials' });
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

    res.status(200).json(user);
};

const testToken = async (req, res) => {
    res.status(201).json();
};

module.exports = {
    register,
    login,
    testToken,
};