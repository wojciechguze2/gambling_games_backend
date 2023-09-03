module.exports = (sequelize, DataTypes) => {
    const GameValue = sequelize.define('GameValue', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        value: {
            type: DataTypes.STRING,
            allowNull: false
        },
        chance: {
            type: DataTypes.INTEGER,
            allowNull: false
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
