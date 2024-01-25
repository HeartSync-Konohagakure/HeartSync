'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Connection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Connection belongs to User as UserA and UserB
      Connection.belongsTo(models.User, { foreignKey: 'UserIdA' });
      Connection.belongsTo(models.User, { foreignKey: 'UserIdB' });
    }
  }
  Connection.init({
    UserIdA: DataTypes.INTEGER,
    UserIdB: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Connection',
  });
  return Connection;
};