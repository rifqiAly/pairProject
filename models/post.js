'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User)
      Post.belongsToMany(models.Tag, {
        through: 'TagPost'
      })
    }
  };
  Post.init({
    namePost: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'nama is required'
        }
      }
    },
    rating: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'rating is required'
        }
      }
    },
    content: {
      type: DataTypes.STRING,
      validate: {
        args: true,
        msg: 'content is required'
      }
    }, 
    imgURL: {
      type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'image tidak boleh kosong'
          }
        }
    } 
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};