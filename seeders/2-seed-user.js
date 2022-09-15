'use strict';
const { hashPass } = require("../helpers");

module.exports = {
  async up (queryInterface, Sequelize) {
    const users = require("../data/user.json");

     users.forEach(user => {
      delete user.id;
      user.password = hashPass(user.password);
      user.createdAt = new Date ();
      user.updatedAt = new Date();
     });
    
    await queryInterface.bulkInsert('Users', users, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
