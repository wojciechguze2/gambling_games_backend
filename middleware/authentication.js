const jwt = require('jsonwebtoken');

function jwtAuthentication(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).send('Access denied.');
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        res.status(401).send('Invalid token.');
    }
}

module.exports = jwtAuthentication;
