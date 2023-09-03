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
        type: Sequelize.STRING,
      },
      chance: {
        type: Sequelize.INTEGER,
      },
      GameId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Game',
          key: 'id',
        },
      },
    }, {
      freezeTableName: true,
      timestamps: false
    });

    await queryInterface.bulkInsert('GameValue', [
      { value: 'Chance 20', chance: '20', gameId: 1 },
      { value: 'Chance 30', chance: '30', gameId: 1 },
      { value: 'Chance 50', chance: '50', gameId: 1 },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('GameValue');
  }
};
