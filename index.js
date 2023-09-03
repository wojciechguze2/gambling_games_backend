const express = require('express');
const bodyParser = require('body-parser');
const db = require("./models");
const errorHandler = require("./middleware/errorHandler");
const app = express();
const port = 8085;

app.use(bodyParser.json());

app.use('/api', require('./routes/gameRoutes'));
app.use(errorHandler);

db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port: ${port}`);
    });
});

