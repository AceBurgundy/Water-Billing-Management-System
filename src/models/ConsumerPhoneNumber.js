/* eslint-disable new-cap */
const { DataTypes } = require('sequelize');
const db = require('../sequelize');
const Consumer = require('./Consumer');

const ConsumerPhoneNumber = db.define(
  'ConsumerPhoneNumber',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    consumerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Consumer id is required'
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

//  Consumer has many ConsumerPhoneNumber
Consumer.hasMany(ConsumerPhoneNumber, {
  foreignKey: 'consumerId',
  as: 'phoneNumbers'
});

ConsumerPhoneNumber.belongsTo(Consumer, {
  foreignKey: 'consumerId',
  as: 'phoneNumbers',
  onDelete: 'CASCADE'
});

ConsumerPhoneNumber.sync()
  .catch(error => {
    console.error('\n\nError creating/synchronizing table for Consumer because of error:', error);
  });

module.exports = ConsumerPhoneNumber;
