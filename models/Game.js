module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Game', {
        name: DataTypes.STRING,
    });
};