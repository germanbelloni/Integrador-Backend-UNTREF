// Model for Genero
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../conexion/database");

class Genero extends Model {}

Genero.init(
  {
    id_genero: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_genero: DataTypes.STRING,
  },
  {
    sequelize,
    // modelName: "genero",
    tableName: "generos",
    timestamps: false,
  }
);

module.exports = Genero;
