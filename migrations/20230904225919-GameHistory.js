'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('GameHistory', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      gameId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Game',
          key: 'id',
        },
      },
      costBaseValue: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
      },
      winBaseValue: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
      },
      winCurrencyId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Currency',
          key: 'id',
        },
      },
      playDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }, {
      freezeTableName: true,
      timestamps: true
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('GameHistory');
  }
};
