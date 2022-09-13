'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    static associate(models) {
      Seat.hasMany(models.Booking, {
        foreignKey: 'SeatId'
      });
    }
  }
  Seat.init({
    row: {
      type : DataTypes.STRING,
      allowNull : false
    },
    number: {
      type : DataTypes.STRING,
      allowNull : false
    },
  }, {
    sequelize,
    modelName: 'Seat',
  });
  return Seat;
};