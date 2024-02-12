const { DataTypes } = require('sequelize');
const db = require('../sequelize');

const Consumer = db.define(
  'Consumer',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    accountNumber: {
      type: DataTypes.STRING(7),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Account Number must be provided'
        },
        notEmpty: {
          msg: 'Account Number is required'
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
          msg: 'First name can only contain letters and spaces'
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
          msg: 'Last name can only contain letters'
        }
      }
    },

    extension: {
      type: DataTypes.STRING(255)
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

    relationshipStatus: {
      type: DataTypes.STRING(35),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Relationship status is required'
        },
        notNull: {
          msg: 'Relationship status is required'
        },
        isIn: {
          args: [['married', 'single', 'prefer not to say']],
          msg: 'Invalid relationship status'
        }
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

    occupation: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Occupation is required'
        },
        notEmpty: {
          msg: 'Occupation is required'
        }
      }
    },

    profilePicture: {
      type: DataTypes.STRING(255),
      defaultValue: 'user.webp'
    },

    certificateOfRecidency: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notNull: {
          message: 'Certificate of Recidency is required'
        },
        notEmpty: {
          message: 'Certificate of Recidency cannot be left empty'
        }
      }
    },

    validId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notNull: {
          message: 'Valid Id is required'
        },
        notEmpty: {
          message: 'Valid Id cannot be left empty'
        }
      }
    },

    moa: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notNull: {
          message: 'MOA is required'
        },
        notEmpty: {
          message: 'MOA cannot be left empty'
        }
      }
    },

    housePicture: {
      type: DataTypes.STRING(255),
      defaultValue: 'blank_image.webp'
    },

    meterNumber: {
      type: DataTypes.STRING(25)
    }
  }
);

Consumer.sync()
  .catch(error => {
    console.error('\n\nError creating/synchronizing table for Consumer because of error:', error);
  });

module.exports = Consumer;
