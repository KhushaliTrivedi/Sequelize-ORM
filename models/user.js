'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post }) {
      // define association here

      // onDelete: CASCADE - will help to delete all the posts if the main user associated with the post is deleted from the database
      this.hasMany(Post, { foreignKey: 'userId', as: 'posts', onDelete: 'cascade', hooks: true})
    }

    toJSON(){
      return { ...this.get(), id:undefined }
    }
  }
  user.init({
    uuid:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'User must have a Name'},
        notEmpty: {msg: 'Name must not be Empty'},
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {msg: 'User must have a Email'},
        notEmpty: {msg: 'Email must not be Empty'},
        isEmail: {msg: 'It must be a valid Email Address'}
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'User must have a Role'},
        notEmpty: {msg: 'Role must not be Empty'},
      }
    }
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'user',
  });
  return user;
};