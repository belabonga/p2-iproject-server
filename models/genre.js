'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {
    static associate(models) {
      // GENRE & MOVIE
      Genre.hasMany(models.Movie, {
        foreignKey: 'GenreId'
      });
    }
  }
  Genre.init({
    name: {
      type : DataTypes.STRING,
      allowNull : false
    }
  }, {
    sequelize,
    modelName: 'Genre',
  });
  return Genre;
};