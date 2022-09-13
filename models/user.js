'use strict';
const bcrypt = require('bcrypt');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // USER & BOOKING
      User.hasMany(models.Booking, {
        foreignKey: 'UserId'
      });
    }
  }
  User.init({
    name: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : "Name is Required"
        },
        notNull : {
          msg : "Name is Required"
        }
      }
    },
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      unique: {
        msg: "Email has already register"
      },
      validate : {
        notEmpty : {
          msg : "Email is Required"
        },
        notNull : {
          msg : "Email is Required"
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : "Password is Required"
        },
        notNull : {
          msg : "Password is Required"
        }
      }
    },
  }, {
    hooks : {
      beforeCreate (user) {
        const hashedPass = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10)); // 10 is default
        user.password = hashedPass
      },
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};