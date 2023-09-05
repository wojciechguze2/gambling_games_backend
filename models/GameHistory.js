const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const GameHistory = sequelize.define('GameHistory', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        gameId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        costBaseValue: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        winBaseValue: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        winCurrencyId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        playDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    }, {
        freezeTableName: true,
        timestamps: true,
    });

    GameHistory.associate = (models) => {
        GameHistory.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: 'CASCADE',
        });

        GameHistory.belongsTo(models.Game, {
            foreignKey: 'gameId',
            onDelete: 'SET NULL',
        });

        GameHistory.belongsTo(models.Currency, {
            foreignKey: 'winCurrencyId',
            onDelete: 'RESTRICT',
        });
    };

    return GameHistory;
};
