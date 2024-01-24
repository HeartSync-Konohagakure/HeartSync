'use strict';
const fs = require('fs');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let data = JSON.parse(fs.readFileSync('./data/userprofiles.json', 'utf-8')).map((el, i) => {
      el.createdAt = el.updatedAt = new Date()
      return el
    })
    await queryInterface.bulkInsert('UserProfiles', data, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserProfiles', null, {
      truncate: true,
      restartIdentity: true,
      cascade: true
    })
  }
};
