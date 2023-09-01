module.exports = (sequelize, DataTypes) => {
    const GameValue = sequelize.define('GameValue', {
        value: DataTypes.STRING,
        chance: DataTypes.INTEGER,
    });

    GameValue.associate = (models) => {
        GameValue.belongsTo(models.Game);
    };

    return GameValue;
};