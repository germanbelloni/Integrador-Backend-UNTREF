// Model for Contenido
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../conexion/database');

class Contenido extends Model {}

Contenido.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
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
      model: 'categorias', // Nombre de la tabla a la que hace referencia
      key: 'id_categoria'
    }
  },
  generos: {
    type: DataTypes.INTEGER,
    references: {
      model: 'generos',
      key: 'id_genero'
    }
  }
}, {
  sequelize,
  modelName: 'contenido',
  tableName: 'contenido',
  timestamps: false
});

module.exports = Contenido;
