'use strict';
const fs = require('fs');
const { hashPassword } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let data = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8'))
      .map((item) => {
        item.createdAt = item.updatedAt = new Date();
        item.password = hashPassword(item.password)
        return item;
      })
    // console.log(data);
    await queryInterface.bulkInsert('Users', data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};