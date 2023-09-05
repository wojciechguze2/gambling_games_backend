const dotenv = require('dotenv');
dotenv.config();

const API_URL = process.env.API_URL || 'http://127.0.0.1';
const API_PORT = process.env.API_PORT || 8085;

const express = require('express');
const bodyParser = require('body-parser');
const db = require("./models");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

app.use(bodyParser.json());

// routes
app.use('/api', require('./routes/userRoutes'));
app.use('/api', require('./routes/gameRoutes'));
app.use('/api', require('./routes/currencyRoutes'));
app.use(errorHandler);

db.sequelize.sync().then(() => {
    app.listen(API_PORT, () => {
        console.log(`Server running on: ${API_URL}:${API_PORT}`);
    });
});

