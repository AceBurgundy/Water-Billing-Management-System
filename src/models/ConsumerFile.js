/* eslint-disable new-cap */
const { DataTypes } = require('sequelize');
const Consumer = require('./Consumer');
const db = require('../sequelize');

const ConsumerFile = db.define(
  'ConsumerFile',
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
        }
      }
    },

    name: {
      allowNull: false,
      type: DataTypes.STRING(255),
      validate: {
        notNull: {
          msg: 'File name is required'
        }
      }
    }
  }
);

//  Consumer has many ConsumerFile
ConsumerFile.belongsTo(Consumer, {
  foreignKey: 'consumerId',
  as: 'files',
  onDelete: 'CASCADE'
});

Consumer.hasMany(ConsumerFile, {
  foreignKey: 'consumerId',
  as: 'files'
});

ConsumerFile.sync()
  .catch(error => {
    console.error('\n\nError creating/synchronizing table for Consumer because of error:', error);
  });

module.exports = ConsumerFile;
