'use strict';
const bcrypt = require('bcryptjs')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post)
    }
  };
  User.init({
    username: {
      unique: true,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Tolong masukkan username dengan benar'
        }
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Tolong masukkan password kamu dengan benar'
        }
      }
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    gender: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate:(inst, opts) => {
        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(inst.password, salt)

        inst.password = hash
      }
    }
  });
  return User;
};