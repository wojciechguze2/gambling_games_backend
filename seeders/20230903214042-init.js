// only run it once after running first migration
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Currency', [
      {
        id: 1,
        name: 'EuroDachshund',
        multiplier: 1
      },
    ], {});

    await queryInterface.bulkInsert('Game', [
      {
        id: 1,
        name: 'Game 1',
        costBaseValue: 20
      },
    ], {});

    await queryInterface.bulkInsert('GameValue', [
      {
        value: '100',
        chance: 10,
        gameId: 1
      },
      {
        value: '50',
        chance: 20,
        gameId: 1
      },
      {
        value: '400',
        chance: 5,
        gameId: 1
      },
      {
        value: '30',
        chance: 30,
        gameId: 1
      },
      {
        value: '20',
        chance: 35,
        gameId: 1
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Currency', null, {});
    await queryInterface.bulkDelete('Game', null, {});
    await queryInterface.bulkDelete('GameValue', null, {});
  }
};
