/* eslint-disable max-len */
/* eslint-disable new-cap */
const { DataTypes } = require('sequelize');
const db = require('../sequelize');

const User = db.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Username is required'
        },
        notEmpty: {
          msg: 'Username is required'
        },
        is: {
          args: /^[A-Za-z\s]+$/,
          msg: 'Must not contain a number or a symbol'
        }
      }
    },

    firstName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'First name is required'
        },
        notEmpty: {
          msg: 'First name is required'
        },
        is: {
          args: /^[A-Za-z\s]+$/,
          msg: 'Must not contain a number or a symbol'
        }
      }
    },

    middleName: {
      type: DataTypes.STRING(255)
    },

    lastName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Last name is required'
        },
        notEmpty: {
          msg: 'Last name is required'
        },
        is: {
          args: /^[A-Za-z\s]+$/,
          msg: 'Must not contain a number or a symbol'
        }
      }
    },

    extension: {
      type: DataTypes.STRING(10)
    },

    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return [
          this.firstName,
          this.middleName ? this.middleName.charAt(0).toUpperCase() : '',
          this.lastName,
          this.extension ? this.extension : ''
        ].join(' ');
      },
      set() {
        throw new Error('Do not try to set the `fullName` value!');
      }
    },

    birthDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Birthdate is required'
        },
        isDate: {
          msg: 'Only date input is allowed'
        }
      }
    },

    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Age is required'
        },
        isNumeric: {
          msg: 'Age must be a number'
        }
      }
    },

    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password is required'
        },
        notEmpty: {
          msg: 'Password is required'
        }
      }
    },

    profilePicture: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Profile picture is missing'
        }
      }
    },

    accessKey: {
      type: DataTypes.STRING(64),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Access key is missing'
        }
      }
    }
  }
);

User.sync()
  .catch(error => {
    console.error('\n\nError creating/synchronizing table for Client because of error:', error);
  });

module.exports = User;
