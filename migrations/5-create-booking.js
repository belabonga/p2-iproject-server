'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING
      },
      UserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model : "Users",
          key : "id"
        },
        onUpdate : "cascade",
        onDelete : "cascade"
      },
      MovieId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model : "Movies",
          key : "id"
        },
        onUpdate : "cascade",
        onDelete : "cascade"
      },
      SeatId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model : "Seats",
          key : "id"
        },
        onUpdate : "cascade",
        onDelete : "cascade"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bookings');
  }
};