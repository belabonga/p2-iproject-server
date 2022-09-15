'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    static associate(models) {
      // MOVIE & BOOKING
      Movie.hasMany(models.Booking, {
        foreignKey: 'MovieId'
      });
      // MOVIE & GENRE
      Movie.belongsTo(models.Genre, {
        foreignKey : "GenreId"
      });
    }
  }
  Movie.init({
    title: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : "Title is Required"
        },
        notNull : {
          msg : "Title is Required"
        }
      }
    },
    synopsis: {
      type : DataTypes.TEXT,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : "Synopsis is Required"
        },
        notNull : {
          msg : "Synopsis is Required"
        }
      }
    },
    trailerUrl: {
      type : DataTypes.STRING,
      allowNull : false
    },
    imageUrl: {
      type : DataTypes.STRING,
      allowNull : false
    },
    price: {
      type : DataTypes.INTEGER,
      allowNull : false
    },
    GenreId: {
      type : DataTypes.INTEGER,
      references : {
        model : 'Genres',
        key : 'id'
      },
      onUpdate : 'cascade',
      onDelete : 'cascade'
    }
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};