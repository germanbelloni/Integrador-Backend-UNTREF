const { sequelize } = require("../conexion/database.js");
const { Model, DataTypes } = require("sequelize");
const Contenido = require("./contenido");
const Categoria = require("./categoria");
const Genero = require("./genero");
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
    modelName: "contenido_actor",
    tableName: "contenido_actores",
    timestamps: false,
  }
);

module.exports = ContenidoActor;

// // // Definir las relaciones
// Contenido.belongsToMany(Actor, {
//  through: 'Contenido_Actores',
//  foreignKey: 'id_contenido'
// })

// Actor.belongsToMany(Contenido, {
//  through: 'Contenido_Actores',
//  foreignKey: 'id_actores'
// })

// Contenido_Actores.belongsTo(Contenido, { foreignKey: 'id_contenido' })
// Contenido_Actores.belongsTo(Actor, { foreignKey: 'id_actores' })
// module.exports = { Contenido_Actores }

// // Relaciones
// Contenido.belongsTo(Categoria, { foreignKey: 'categorias' });
// Contenido.belongsTo(Genero, { foreignKey: 'generos' });
// Contenido.belongsToMany(Actor, { through: ContenidoActor, foreignKey: 'id_contenido' });
// Actor.belongsToMany(Contenido, { through: ContenidoActor, foreignKey: 'id_actor' });

// module.exports = {
//   Contenido,
//   Categoria,
//   Genero,
//   Actor,
//   ContenidoActor
// };
