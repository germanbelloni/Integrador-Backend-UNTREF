// Model for Contenido
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../conexion/database");
const Categoria = require("../models/categoria");
const Genero = require("../models/genero");
const Actor = require("../models/actor");

class Contenido extends Model {}

Contenido.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    poster: DataTypes.STRING,
    titulo: DataTypes.STRING,
    resumen: DataTypes.TEXT,
    temporadas: DataTypes.INTEGER,
    duracion: DataTypes.STRING,
    trailer: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "contenido",
    tableName: "contenido",
    timestamps: false,
  }
);

// Relaciones
Contenido.belongsTo(Categoria, { foreignKey: "id_categoria", as: "categoria" });
Contenido.belongsToMany(Genero, {
  as: "genero",
  through: "contenidoGeneros",
  foreignKey: "id_contenido",
  otherKey: "id_genero",
  timestamps: false,
});
Contenido.belongsToMany(Actor, {
  as: "actor",
  through: "contenidoActor",
  foreignKey: "id_contenido",
  otherKey: "id_actor",
  timestamps: false,
});

module.exports = Contenido;
