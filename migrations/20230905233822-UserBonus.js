'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.createTable('UserBonus', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            code: {
                type: Sequelize.STRING,
                allowNull: false
            },
            baseValue: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: true
            },
        }, {
            freezeTableName: true,
            timestamps: false
        });
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.dropTable('UserBonus');
    }
};
