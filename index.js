const express = require('express');
const bodyParser = require('body-parser');
const db = require("./models");
const app = express();
const port = 8085;

app.use(bodyParser.json());
app.use('/api', require('./routes/gameRoutes'));

db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port: ${port}`);
    });
});

