const { Sequelize } = require("sequelize");
require('dotenv').config

const sequelize = new Sequelize(
  process.env.DB_NAME || "trailerflix",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "germancito87",
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    dialect: process.env.DB_DIALECT || "mysql",
  }
);

sequelize
  .authenticate()
  .then(() => console.log("Conectado a la base de datos MySQL"))
  .catch((err) => console.log("No se pudo conectar a la base de datos", err));

module.exports = sequelize;
