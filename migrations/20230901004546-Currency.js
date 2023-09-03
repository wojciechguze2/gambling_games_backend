'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.createTable('Currency', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            multiplier: {
                type: Sequelize.DECIMAL(10, 4),
                allowNull: false
            },
        }, {
            freezeTableName: true,
            timestamps: false
        });

    },

    async down (queryInterface, Sequelize) {
        await queryInterface.dropTable('Currency');
    }
};
