/* eslint-disable new-cap */
const { DataTypes } = require('sequelize');
const db = require('../sequelize');
const User = require('./User');

const UserPhoneNumber = db.define(
  'UserPhoneNumber',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'User ID is required'
        }
      }
    },

    phoneNumber: {
      type: DataTypes.STRING(10),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Phone Number is required'
        },
        isNumeric: {
          msg: 'Must only contain numbers'
        },
        notEmpty: {
          msg: 'Phone number is required'
        }
      }
    }
  }
);

// User has many UserPhoneNumber
User.hasMany(UserPhoneNumber, {
  foreignKey: 'userId',
  as: 'phoneNumbers'
});

UserPhoneNumber.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  as: 'phoneNumbers'
});

UserPhoneNumber.sync()
  .catch(error => {
    console.error('\n\nError creating/synchronizing table for Client because of error:', error);
  });

module.exports = UserPhoneNumber;
