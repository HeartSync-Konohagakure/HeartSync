'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Message belongs to User as Sender and Receiver
      Message.belongsTo(models.User, { foreignKey: 'SenderId' });
      Message.belongsTo(models.User, { foreignKey: 'ReceiverId' });
      // Message belongs to Chat
      Message.belongsTo(models.Chat, { foreignKey: 'ChatId' });
    }
  }
  Message.init({
    SenderId: DataTypes.INTEGER,
    ReceiverId: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    ChatId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};