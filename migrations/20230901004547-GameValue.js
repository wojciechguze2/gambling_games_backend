'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('GameValue', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      value: {
        type: Sequelize.DECIMAL(13, 4),
      },
      chance: {
        type: Sequelize.INTEGER,
      },
      isJackpot: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      GameId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Game',
          key: 'id',
        },
      },
      currencyId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Currency',
          key: 'id'
        },
        defaultValue: 1
      }
    }, {
      freezeTableName: true,
      timestamps: false
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('GameValue');
  }
};
