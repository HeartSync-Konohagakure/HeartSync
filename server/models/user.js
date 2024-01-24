'use strict';
const { hashPassword } = require('../helpers/bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // User has one UserProfile
      User.hasOne(models.UserProfile, { foreignKey: 'UserId' });
      // User has many Connections (as UserA or UserB)
      User.hasMany(models.Connection, { foreignKey: 'UserIdA' });
      User.hasMany(models.Connection, { foreignKey: 'UserIdB' });
      // User has many Chats (as UserA or UserB)
      User.hasMany(models.Chat, { foreignKey: 'UserIdA' });
      User.hasMany(models.Chat, { foreignKey: 'UserIdB' });
      // User has many Messages (as Sender or Receiver)
      User.hasMany(models.Message, { foreignKey: 'SenderId' });
      User.hasMany(models.Message, { foreignKey: 'ReceiverId' });
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Username already exists"
      },
      validate: {
        notEmpty: {
          msg: "Username is required",
        },
        notNull: {
          msg: "Username is required",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Email already exists"
      },
      validate: {
        notEmpty: {
          msg: "Email is required",
        },
        notNull: {
          msg: "Email is required",
        },
        isEmail: {
          args: true,
          msg: "Email format is wrong",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password is required",
        },
        notNull: {
          msg: "Password is required",
        },
        len: {
          args: [5],
          msg: "The minimum password length is 5 characters",
        },
      },
    },
    remainingLikes: {
      type: DataTypes.INTEGER,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Gender is required",
        },
        notNull: {
          msg: "Gender is required",
        },
        isIn: {
          args: [['male', 'female']],
          msg: 'Invalid gender. Choose either male or female',
        },
      },
    },
    interest: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Interest is required",
        },
        notNull: {
          msg: "Interest is required",
        },
        isIn: {
          args: [['male', 'female']],
          msg: 'Invalid interest. Choose either male or female',
        },
      },
    },
    show: {
      type: DataTypes.BOOLEAN,
    },
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (instance) => {
        let hash = hashPassword(instance.password)
        instance.password = hash
        instance.remainingLikes = 5
        instance.show = true
      }
    }
  });
  return User;
};