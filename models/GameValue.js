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
        }
    }, {
        freezeTableName: true,
        timestamps: false
    })


    GameValue.associate = (models) => {
        GameValue.belongsTo(models.Game, { foreignKey: 'gameId' });
    }

    return GameValue
};
