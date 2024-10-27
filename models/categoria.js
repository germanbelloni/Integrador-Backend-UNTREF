// Model for Categoria
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../conexion/database');

class Categoria extends Model {}

Categoria.init({
  id_categoria: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre_categoria: DataTypes.STRING
}, {
  sequelize,
  modelName: 'categoria',
  tableName: 'categorias',
  timestamps: false
});

module.exports = Categoria;
