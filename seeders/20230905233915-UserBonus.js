// only run it once after running first migration
'use strict';

const { USER_REGISTER_BONUS_CODE } = require("../utils/constants")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.bulkInsert('UserBonus', [
            {
                code: USER_REGISTER_BONUS_CODE,
                baseValue: 1000
            },
        ], {});
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.bulkDelete('UserBonus', null, {});
    }
};
