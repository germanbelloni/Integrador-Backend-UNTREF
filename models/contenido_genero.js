const sequelize = require("../conexion/database.js");
const { Model, DataTypes } = require("sequelize");
const Contenido = require("./contenido");
const Genero = require("./genero");

class ContenidoGeneros extends Model {}

ContenidoGeneros.init(
  {
    id_contenido: {
      type: DataTypes.INTEGER,
      references: {
        model: "contenido",
        key: "id",
      },
    },
    id_genero: {
      type: DataTypes.INTEGER,
      references: {
        model: "generos",
        key: "id_genero",
      },
    },
  },
  {
    sequelize,
    // modelName: "contenido_genero",
    tableName: "contenido_genero",
    timestamps: false,
  }
);

module.exports = ContenidoGeneros;
