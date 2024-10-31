const { sequelize } = require("../conexion/database.js");
const { Model, DataTypes } = require("sequelize");
const Contenido = require("./contenido");
const Actor = require("./actor");

class ContenidoActor extends Model {}

ContenidoActor.init(
  {
    id_contenido: {
      type: DataTypes.INTEGER,
      references: {
        model: Contenido,
        key: "id",
      },
    },
    id_actor: {
      type: DataTypes.INTEGER,
      references: {
        model: Actor,
        key: "id_actor",
      },
    },
  },
  {
    sequelize,
    modelName: "contenido_actor",
    tableName: "contenido_actores",
    timestamps: false,
  }
);

ContenidoActor.belongsTo(Contenido, { foreignKey: "id_contenido" });
ContenidoActor.belongsTo(Actor, { foreignKey: "id_actor" });

module.exports = ContenidoActor;
