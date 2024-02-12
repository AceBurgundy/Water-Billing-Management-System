/* eslint-disable new-cap */
const { DataTypes } = require('sequelize');
const db = require('../sequelize');
const Consumer = require('./Consumer');

const ConsumerConnectionStatus = db.define(
  'ConsumerConnectionStatus',
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
          msg: 'Consumers ID is required'
        },
        notEmpty: {
          msg: 'Consumers ID is required'
        },
        isInt: {
          msg: 'Consumers ID Record must be a number'
        }
      }
    },

    status: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Connection status is required'
        },
        notEmpty: {
          msg: 'Connection status is required'
        },
        isIn: {
          args: [['paid', 'unpaid', 'overpaid', 'underpaid']],
          msg: 'Invalid connection status'
        }
      }
    },

    amountPaid: {
      type: DataTypes.INTEGER
    }
  }
);

// Consumer has many ConsumerConnectionStatus
ConsumerConnectionStatus.belongsTo(Consumer, {
  foreignKey: 'consumerId',
  as: 'connectionStatuses',
  onDelete: 'CASCADE'
});

Consumer.hasMany(ConsumerConnectionStatus, {
  foreignKey: 'consumerId',
  as: 'connectionStatuses'
});

ConsumerConnectionStatus.sync()
  .catch(error => {
    console.error('\n\nError creating/synchronizing table for Consumer because of error:', error);
  });

module.exports = ConsumerConnectionStatus;
