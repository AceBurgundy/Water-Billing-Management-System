const { DataTypes } = require('sequelize');
const ConsumerBill = require('./ConsumerBill');
const db = require('../sequelize');

const PartialPayment = db.define(
  'PartialPayment',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    consumerBillId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Consumer Bill id is required'
        }
      }
    },

    paymentDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },

    amountPaid: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Amount Paid is required'
        },
        isDecimal: {
          msg: 'Must be a decimal number ex: (100.00)'
        }
      }
    }
  }
);

// ConsumerBill has many PartialPayment
ConsumerBill.hasMany(PartialPayment, {
  foreignKey: 'consumerBillId',
  as: 'partialPayments'
});

PartialPayment.belongsTo(ConsumerBill, {
  foreignKey: 'consumerBillId',
  onDelete: 'CASCADE',
  as: 'partialPayments'
});

PartialPayment.sync()
  .catch(error => {
    console.error('\n\nError creating/synchronizing table for Consumer because of error:', error);
  });

module.exports = PartialPayment;
