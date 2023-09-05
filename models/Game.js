module.exports = (sequelize, DataTypes) => {
    const Game = sequelize.define('Game', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'new-game'
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        costBaseValue: {  // costBaseValue * currency multiplier = price
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    }, {
        freezeTableName: true,
        timestamps: true
    });

    Game.associate = (models) => {
        Game.hasMany(models.GameValue, { foreignKey: 'gameId' });
    }

    return Game
}
