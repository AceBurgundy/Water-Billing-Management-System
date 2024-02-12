/* eslint-disable no-console */
const { Sequelize } = require('sequelize');

const db = new Sequelize({
  dialect: 'sqlite',
  storage: './app.sqlite3',
  define: {
    freezeTableName: true
  },
  logging: false
});

db.sync()
  .then(() => console.log('Database synced successfully'))
  .catch(error => console.error('Database sync failed:', error));

module.exports = db;
