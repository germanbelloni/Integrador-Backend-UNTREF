// Model for Genero
const { DataTypes } = require('sequelize')
const { sequelize } = require('../conexion/database.js')

const Genero = sequelize.define(
    'Genero',
    {
     id_genero: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true
     },
     nombre: {
      type: DataTypes.STRING(100),
      allowNull: true,
      default: 1
     }
    },
    {
     tableName: 'generos',
     timestamps: false
    }
   )
   
   module.exports = { Genero }