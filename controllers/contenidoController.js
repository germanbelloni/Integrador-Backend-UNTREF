const Contenido = require("../models/contenido");
const Categoria = require("../models/categoria");
const Genero = require("../models/genero");
const Actor = require("../models/actor");
// const ContenidoActor = require('../models/contenido_actores')
const { sequelize, Op } = require("sequelize");

//Obtener todos los datos
exports.getAllData = async (req, res) => {
  try {
    const contenidos = await Contenido.findAll();
    res.status(200).json(contenidos);
  } catch (error) {
    console.log("Error buscando el contenido", error);
    res.status(500).json({ message: "Error buscando el contenido", error });
  }
};

//Obtener datos por ID
exports.getDatabyId = async (req, res) => {
  try {
    const contenido = await Contenido.findByPk(req.params.id);
    if (!contenido) {
      return res.status(404).json({ message: "Id no encontrado" });
    }
    res.status(200).json(contenido);
  } catch (error) {
    console.log("Error buscando los datos del ID", error);
    res.status(500).json({ message: "Error buscando los datos del ID", error });
  }
};

//Filtrar datos por titulo
exports.filterDataByTitle = async (req, res) => {
  const { titulo } = req.body;
  try {
    const contenidos = await Contenido.findAll({
      where: {
        titulo: {
          [Op.like]: `%${titulo}%`,
        },
      },
    });

    if (contenidos.length === 0) {
      return res
        .status(404)
        .json({ message: "No existe contenido con ese titulo" });
    }

    res.status(200).json(contenidos);
  } catch (error) {
    console.log("Error filtrando por titulo", error);
    res.status(500).json({ message: "Erorr filtrando por titulo" }, error);
  }
};

//Filtrar datos por categoria
exports.filterDatabyCategory = async (req, res) => {
  const { categoria } = req.query; // Aquí obtienes el ID de la categoría del query string
  try {
    const contenidos = await Contenido.findAll({
      where: {
        categorias: {
          [Op.eq]: categoria, // Filtra el contenido por ID de categoría
        },
      },
      include: [
        {
          model: Categoria, // Incluye el modelo de Categoria
          required: true, // Asegúrate de que haya un join
        },
      ],
    });

    if (contenidos.length === 0) {
      return res
        .status(404)
        .json({ message: "No hay datos con esa categoría" });
    }

    res.status(200).json(contenidos);
  } catch (error) {
    console.error("Error filtrando por categoría:", error);
    res.status(500).json({ message: "Error filtrando por categoría", error });
  }
};

//Filtrar datos por genero
exports.filterDatabyGenre = async (req, res) => {
  const { genero } = req.query;
  try {
    const contenidos = await Contenido.findAll({
      include: [
        {
          model: Genero,
          where: {
            nombre_genero: {
              [Op.like]: `%${genero}%`,
            },
          },
        },
      ],
    });

    if (contenidos.length === 0) {
      return res.status(404).json({ message: "No hay datos con ese genero" });
    }

    res.status(200).json(contenidos);
  } catch (error) {
    console.error("Error filtrando con ese genero:", error);
    res.status(500).json({ message: "Error filtrando con ese genero", error });
  }
};

// Crea nuevos datos
exports.createData = async (req, res) => {
  console.log(req.body);
  const {
    titulo,
    reparto,
    generos,
    categorias,
    resumen,
    temporadas,
    duracion,
    trailer,
    poster,
  } = req.body;

  // Validación de campos obligatorios
  if (
    !titulo ||
    !categorias ||
    !generos ||
    !resumen ||
    !trailer ||
    !poster ||
    !reparto ||
    !duracion
  ) {
    return res
      .status(400)
      .json({ message: "Todos los campos se deben completar" });
  }

  try {
    const nuevoContenido = await Contenido.create({
      titulo,
      reparto,
      generos,
      categorias,
      resumen,
      temporadas,
      duracion,
      trailer,
      poster,
    });
    res
      .status(201)
      .json({ message: "Contenido creado exitosamente", data: nuevoContenido });
  } catch (error) {
    console.error("Error creando contenido:", error);
    res
      .status(500)
      .json({ message: "Error creando contenido", error: error.message });
  }
};


// Actualizar Datos
exports.updateData = async (req, res) => {
  try {
    const contenido = await Contenido.findByPk(req.params.id);
    
    // Verificar si el contenido existe
    if (!contenido) {
      return res.status(404).json({ message: "Datos no encontrados" });
    }

    // Validación de campos obligatorios (opcional, ajusta según tus necesidades)
    const { titulo, categorias, resumen, trailer, poster } = req.body;
    if (!titulo || !categorias || !resumen || !trailer || !poster) {
      return res.status(400).json({ message: "Todos los campos obligatorios deben ser completados" });
    }

    // Actualizar el contenido
    await contenido.update(req.body);
    res.status(200).json(contenido);
  } catch (error) {
    console.error("Error actualizando datos:", error);
    res.status(500).json({ message: "Error actualizando datos", error });
  }
};

// Eliminar Datos
exports.deleteData = async (req, res) => {
  try {
    // Buscar el contenido por ID
    const contenido = await Contenido.findByPk(req.params.id);
    
    // Verificar si el contenido existe
    if (!contenido) {
      return res.status(404).json({ message: "Datos no encontrados" });
    }

    // Eliminar el contenido
    await contenido.destroy();
    res.status(200).json({ message: "Contenido eliminado exitosamente" });
  } catch (error) {
    console.error("Error eliminando datos:", error);
    res.status(500).json({ message: "Error eliminando datos", error });
  }
};

