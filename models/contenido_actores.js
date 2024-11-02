const sequelize = require("../conexion/database.js");
const { Model, DataTypes } = require("sequelize");
const Contenido = require("./contenido");
const Actor = require("./actor");

class ContenidoActor extends Model {}

ContenidoActor.init(
  {
    id_contenido: {
      type: DataTypes.INTEGER,
      references: {
        model: "contenido",
        key: "id",
      },
    },
    id_actor: {
      type: DataTypes.INTEGER,
      references: {
        model: "actores",
        key: "id_actor",
      },
    },
  },
  {
    sequelize,
    // modelName: "contenido_actor",
    tableName: "contenido_actores",
    timestamps: false,
  }
);

module.exports = ContenidoActor;
