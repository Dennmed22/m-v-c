const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.MVC_URL || process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.MVCDB_URL ? undefined : 'localhost',
    dialect: process.env.MVCDB_URL ? 'mysql' : 'mysql',
    port: process.env.MVCDB_URL ? undefined : 3306
  }
);

module.exports = sequelize;