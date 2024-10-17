// Model for Contenido

const { DataTypes } = require('sequelize')
const { sequelize } = require('../conexion/database.js')

const Contenido = sequelize.define(
 'Contenido',
 {
  id_contenido: {
   type: DataTypes.INTEGER,
   primaryKey: true,
   autoIncrement: true,
   allowNull: false,
   unique: true
  },
  poster: {
   type: DataTypes.STRING(100),
   allowNull: true,
   default: 1
  },
  titulo: {
   type: DataTypes.STRING(100),
   allowNull: false
  },
  id_categoria: {
   type: DataTypes.INTEGER,
   allowNull: false
  },
  resumen: {
   type: DataTypes.TEXT,
   allowNull: false
  },
  gen: {
   type: DataTypes.STRING(100),
   allowNull: false
  },
  id_busqueda: {
   type: DataTypes.INTEGER,
   allowNull: false
  },
  temporada: {
   type: DataTypes.STRING(20),
   allowNull: true,
   default: 'N/A'
  },
  duracion: {
   type: DataTypes.STRING(100),
   allowNull: true,
   default: 'N/A,'
  },
  trailer: {
   type: DataTypes.STRING(100),
   allowNull: false
  }
 },
 {
  tableName: 'contenido',
  timestamps: false
 }
)

module.exports = { Contenido }