/* eslint-disable new-cap */
const { DataTypes } = require('sequelize');
const db = require('../sequelize');
const Consumer = require('./Consumer');

const ConsumerBill = db.define(
  'ConsumerBill',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    billNumber: {
      type: DataTypes.STRING(7),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Account number must be provided'
        },
        notEmpty: {
          msg: 'Account number is required'
        }
      }
    },

    consumerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Consumer ID is required'
        },
        isInt: {
          msg: 'Consumer ID must be an integer'
        }
      }
    },

    previousReading: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'First reading is required'
        },
        isDecimal: {
          msg: 'Must be a decimal number ex: (100.00)'
        }
      }
    },

    presentReading: {
      type: DataTypes.DECIMAL(10, 2),
      validate: {
        isDecimal: {
          msg: 'Must be a decimal number ex: (100.00)'
        }
      }
    },

    consumption: {
      type: DataTypes.DECIMAL(10, 2),
      validate: {
        isInt: {
          msg: 'Consumption must be an integer'
        }
      }
    },

    total: {
      type: DataTypes.DECIMAL(10, 2),
      validate: {
        isDecimal: {
          msg: 'Bill amount must be a decimal number ex: (100.00)'
        }
      }
    },

    status: {
      type: DataTypes.STRING(50),
      defaultValue: 'unpaid',
      validate: {
        isIn: {
          args: [['unpaid', 'paid', 'underpaid', 'overpaid']],
          msg: 'Payment status must be \'unpaid\', \'paid\', \'underpaid\', \'overpaid\''
        }
      }
    },

    amountPaid: {
      type: DataTypes.DECIMAL(10, 2),
      validate: {
        isDecimal: {
          msg: 'Payment amount must be a decimal number ex: (100.00)'
        }
      }
    },

    balance: {
      type: DataTypes.DECIMAL(10, 2),
      validate: {
        isDecimal: {
          msg: 'Remaining balance must be a decimal number ex: (100.00)'
        }
      }
    },

    excess: {
      type: DataTypes.DECIMAL(10, 2),
      validate: {
        isDecimal: {
          msg: 'Payment excess must be a decimal number ex: (100.00)'
        }
      }
    },

    paymentDate: {
      type: DataTypes.DATE,
      validate: {
        isDate: {
          msg: 'Payment date must be a valid date'
        }
      }
    },

    penalty: {
      type: DataTypes.DECIMAL(10, 2),
      validate: {
        isDecimal: {
          msg: 'Penalty amount must be a decimal number ex: (100.00)'
        }
      }
    },

    dueDate: {
      type: DataTypes.DATE,
      validate: {
        isDate: {
          msg: 'Due date must be a valid date'
        }
      }
    },

    disconnectionDate: {
      type: DataTypes.DATE,
      validate: {
        isDate: {
          msg: 'Disconnection date must be a valid date'
        }
      }
    }
  }
);

// Consumer has many ConsumerBill
Consumer.hasMany(ConsumerBill, {
  foreignKey: 'consumerId',
  as: 'bills'
});

ConsumerBill.belongsTo(Consumer, {
  foreignKey: 'consumerId',
  as: 'bills',
  onDelete: 'CASCADE'
});

ConsumerBill.sync()
  .catch(error => {
    console.error('\n\nError creating/synchronizing table for Consumer because of error:', error);
  });

module.exports = ConsumerBill;
