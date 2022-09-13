'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      // BOOKING & USER
      Booking.belongsTo(models.User, {
        foreignKey : "UserId"
      });
      // BOOKING & SEAT
      Booking.belongsTo(models.Seat, {
        foreignKey : "SeatId"
      });
      // BOOKING & USER
      Booking.belongsTo(models.Movie, {
        foreignKey : "MovieId"
      });
    }
  }
  Booking.init({
    date: {
      type : DataTypes.DATE,
      allowNull : false
    },
    status: {
      type : DataTypes.STRING,
      allowNull : false
    },
    UserId: {
      type : DataTypes.INTEGER,
      references : {
        model : 'Users',
        key : 'id'
      },
      onUpdate : 'cascade',
      onDelete : 'cascade'
    },
    MovieId: {
      type : DataTypes.INTEGER,
      references : {
        model : 'Movies',
        key : 'id'
      },
      onUpdate : 'cascade',
      onDelete : 'cascade'
    },
    SeatId: {
      type : DataTypes.INTEGER,
      references : {
        model : 'Seats',
        key : 'id'
      },
      onUpdate : 'cascade',
      onDelete : 'cascade'
    },
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};