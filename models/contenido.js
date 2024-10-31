// Model for Contenido
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../conexion/database");
const Categoria = require("../models/categoria");
const Genero = require("../models/genero");

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
// Establecer relación
Contenido.belongsTo(Categoria, { foreignKey: "categorias" }); // Relación con Categoria
// Contenido.belongsToMany(Genero, { through: 'contenido_genero', foreignKey: 'id_contenido', otherKey: 'id_genero' }); // Relación con Genero

// Contenido.belongsTo(Categoria, { foreignKey: "id_categoria" }); // Relación uno a uno

module.exports = Contenido;
