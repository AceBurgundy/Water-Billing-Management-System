/* eslint-disable new-cap */
const { DataTypes } = require('sequelize');
const Consumer = require('./Consumer');
const db = require('../sequelize');

const ConsumerAddress = db.define(
  'ConsumerAddress',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    street: {
      type: DataTypes.STRING(50)
    },

    barangay: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        is: {
          args: /^[A-Za-z\s0-9.]+$/,
          msg: 'Barangay can only contain letters numbers and spaces'
        },
        notNull: {
          msg: 'Barangay is required'
        },
        notEmpty: {
          msg: 'Barangay is required'
        }
      }
    },

    municipality: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        is: {
          args: /^[A-Za-z\s0-9.]+$/,
          msg: 'Municipality can only contain letters numbers and spaces'
        },
        notNull: {
          msg: 'Municipality is required'
        },
        notEmpty: {
          msg: 'Municipality is required'
        }
      }
    },

    province: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        is: {
          args: /^[A-Za-z\s0-9.]+$/,
          msg: 'Province can only contain letters numbers and spaces'
        },
        notNull: {
          msg: 'Province is required'
        },
        notEmpty: {
          msg: 'Province is required'
        }
      }
    },

    postalCode: {
      type: DataTypes.STRING(4),
      allowNull: false,
      validate: {
        isAlphanumeric: {
          msg: 'Postal Code can only contain letters and numbers'
        },
        notNull: {
          msg: 'Postal Code is required'
        },
        notEmpty: {
          msg: 'Postal Code is required'
        }
      }
    },

    region: {
      type: DataTypes.STRING(255)
    },

    details: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Details is required'
        },
        notEmpty: {
          msg: 'Address details is required'
        }
      }
    },

    fullAddress: {
      type: DataTypes.VIRTUAL,
      get() {
        return [
          this.details,
          this.street ?? '',
          this.barangay,
          this.city,
          this.postalCode
        ].join(' ');
      },
      set() {
        throw new Error('Do not try to set the `fullName` value!');
      }
    }
  }
);

// Consumer has many Address
Consumer.hasOne(ConsumerAddress, {
  foreignKey: 'mainAddressId',
  as: 'mainAddress'
});

Consumer.hasOne(ConsumerAddress, {
  foreignKey: 'presentAddressId',
  as: 'presentAddress'
});

ConsumerAddress.belongsTo(Consumer, {
  foreignKey: 'mainAddressId',
  as: 'mainAddress'
});

ConsumerAddress.belongsTo(Consumer, {
  foreignKey: 'presentAddressId',
  as: 'presentAddress'
});

ConsumerAddress.sync()
  .catch(error => {
    console.error('\n\nError creating/synchronizing table for Consumer because of error:', error);
  });

module.exports = ConsumerAddress;
