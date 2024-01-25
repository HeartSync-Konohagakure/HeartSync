'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // UserProfile belongs to User
      UserProfile.belongsTo(models.User, { foreignKey: 'UserId' });
    }
  }
  UserProfile.init({
    fullname: DataTypes.STRING,
    birthdate: DataTypes.DATE,
    profilePicture: DataTypes.STRING,
    address: DataTypes.STRING,
    occupation: DataTypes.STRING,
    bio: DataTypes.TEXT,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};