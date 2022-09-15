'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const seats = require("../data/seat.json");

     seats.forEach(seat => {
      delete seat.id;
      seat.createdAt = new Date ();
      seat.updatedAt = new Date();
     });
    
    await queryInterface.bulkInsert('Seats', seats, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Seats', null, {});
  }
};
