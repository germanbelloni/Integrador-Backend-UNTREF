// Model for Contenido
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../conexion/database");
const Categoria = require("../models/categoria");
const Genero = require("../models/genero");
const Actor = require("../models/actor");
const ContenidoActor = require("./contenido_actores");

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
    reparto: DataTypes.TEXT,
    categorias: {
      type: DataTypes.INTEGER,
      references: {
        model: "categorias", // Nombre de la tabla referenciada
        key: "id_categoria",
      },
      allowNull: false,
    },
    generos: {
      type: DataTypes.INTEGER,
      references: {
        model: "generos",
        key: "id_genero",
      },
    },
  },
  {
    sequelize,
    modelName: "contenido",
    tableName: "contenido",
    timestamps: false,
  }
);

// Relación entre Contenido y Actor (Muchos a Muchos)
Contenido.belongsToMany(Actor, {
  through: ContenidoActor,
  foreignKey: "id_contenido",
});

Actor.belongsToMany(Contenido, {
  through: ContenidoActor,
  foreignKey: "id_actor",
});

// Relación entre Contenido y Categoria (Uno a Muchos)
Contenido.belongsTo(Categoria, {
  foreignKey: "id_categoria",
});

Categoria.hasMany(Contenido, {
  foreignKey: "id_categoria",
});

module.exports = Contenido;
