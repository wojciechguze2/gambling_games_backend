const db = require("../models")

const getGames = async (req, res) => {
    try {
        const games = await db.Game.findAll({
            include: [
                {
                    model: db.GameValue
                }
            ],
        });

        res.json(games);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'getGames 500'
        });
    }
};

module.exports = {
    getGames,
};