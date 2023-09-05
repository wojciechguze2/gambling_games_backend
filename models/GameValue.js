module.exports = (sequelize, DataTypes) => {
    const GameValue = sequelize.define('GameValue', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        value: {
            type: DataTypes.DECIMAL(13, 4),
            allowNull: false
        },
        chance: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        isJackpot: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        gameId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Game',
                key: 'id'
            }
        },
        currencyId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Currency',
                key: 'id'
            },
            defaultValue: 1
        }
    }, {
        freezeTableName: true,
        timestamps: false
    })

    GameValue.associate = (models) => {
        GameValue.belongsTo(models.Game, { foreignKey: 'gameId' });
        GameValue.belongsTo(models.Currency, { foreignKey: 'currencyId' });
    }

    return GameValue
};
