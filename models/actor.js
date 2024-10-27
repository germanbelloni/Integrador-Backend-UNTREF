// Model for Actor
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../conexion/database');

class Actor extends Model {}

Actor.init({
  id_actor: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre_actor: DataTypes.STRING
}, {
  sequelize,
  modelName: 'actor',
  tableName: 'actores',
  timestamps: false
});

module.exports = Actor;
