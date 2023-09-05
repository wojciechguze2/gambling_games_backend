module.exports = (sequelize, DataTypes) => {
    return sequelize.define('UserBonus', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        baseValue: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
    }, {
        freezeTableName: true,
        timestamps: false
    })
};
