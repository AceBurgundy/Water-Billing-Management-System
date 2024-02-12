/* eslint-disable new-cap */
const { DataTypes } = require('sequelize');
const db = require('../sequelize');
const User = require('./User');

const RecoveryCode = db.define(
  'RecoveryCode',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    code: {
      type: DataTypes.STRING(8),
      allowNull: false
    }
  }
);

// User has many RecoveryCode
User.hasMany(RecoveryCode, {
  foreignKey: 'userId',
  as: 'recoveryCodes'
});

RecoveryCode.belongsTo(User, {
  foreignKey: 'userId',
  as: 'recoveryCodes',
  onDelete: 'CASCADE'
});

RecoveryCode.sync()
  .catch(error => {
    console.error('\n\nError creating/synchronizing table for Client because of error:', error);
  });

module.exports = RecoveryCode;
