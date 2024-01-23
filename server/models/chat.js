'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Chat belongs to User as UserA and UserB
      Chat.belongsTo(models.User, { as: 'UserA', foreignKey: 'UserIdA' });
      Chat.belongsTo(models.User, { as: 'UserB', foreignKey: 'UserIdB' });
    }
  }
  Chat.init({
    UserIdA: DataTypes.INTEGER,
    UserIdB: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Chat',
  });
  return Chat;
};