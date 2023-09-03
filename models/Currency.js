module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Currency', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        multiplier: {
            type: DataTypes.DECIMAL(10, 4),
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    })
};
