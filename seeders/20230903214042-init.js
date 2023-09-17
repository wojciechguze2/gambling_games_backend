// only run it once after running first migration
'use strict';

const {USER_REGISTER_BONUS_CODE} = require("../utils/constants");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const getInitialGameValues = (gameId) => {
      return [
        {
          value: 10000,
          chance: 0.01,
          gameId
        },
        {
          value: 5000,
          chance: 0.25,
          gameId
        },
        {
          value: 150,
          chance: 15,
          gameId
        },
        {
          value: 60,
          chance: 25,
          gameId
        },
        {
          value: 8000,
          chance: 0.05,
          gameId
        },
        {
          value: 200,
          chance: 10,
          gameId
        },
        {
          value: 4000,
          chance: 0.1,
          gameId
        },
        {
          value: 40,
          chance: 30,
          gameId
        },
        {
          value: 25,
          chance: 35,
          gameId
        },
        {
          value: 2500,
          chance: 1,
          gameId
        },
      ]
    }

    await queryInterface.bulkInsert('Currency', [
      {
        id: 1,
        name: 'EuroDachshund',
        multiplier: 1
      },
    ], {});

    await queryInterface.bulkInsert('Currency', [
      {
        id: 2,
        name: 'PolskiJamnik',
        multiplier: 0.25
      },
    ], {});

    await queryInterface.bulkInsert('Currency', [
      {
        id: 3,
        name: 'DolarDachshund',
        multiplier: 0.1
      },
    ], {});

    await queryInterface.bulkInsert('Game', [
      {
        id: 1,
        code: 'wheel-of-fortune',
        name: 'Koło fortuny',
        costBaseValue: 100
      },
    ], {});

    await queryInterface.bulkInsert('Game', [
      {
        id: 2,
        code: 'fruit-machine',
        name: 'Jednoręki bandyta',
        costBaseValue: 100
      },
    ], {});

    await queryInterface.bulkInsert('Game', [
      {
        id: 3,
        code: 'number-lottery',
        name: 'Loteria liczbowa',
        costBaseValue: 100
      },
    ], {});

    await queryInterface.bulkInsert('GameValue', getInitialGameValues(1), {});
    await queryInterface.bulkInsert('GameValue', getInitialGameValues(2), {});
    await queryInterface.bulkInsert('GameValue', getInitialGameValues(3), {});

    await queryInterface.bulkInsert('UserBonus', [
      {
        code: USER_REGISTER_BONUS_CODE,
        baseValue: 1000
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Currency', null, {});
    await queryInterface.bulkDelete('Game', null, {});
    await queryInterface.bulkDelete('GameValue', null, {});
    await queryInterface.bulkDelete('UserBonus', null, {});
  }
};
