const Contenido = require("../models/contenido");
const Categoria = require("../models/categoria");
const Genero = require("../models/genero");
const Actor = require("../models/actor");
// const ContenidoActor = require('../models/contenido_actores') ERROR SIEMPRE
const { sequelize, Op } = require("sequelize");

/**
 * @swagger
 * /contenido:
 *   get:
 *     summary: Obtener todos los contenidos
 *     tags: [Contenido]
 *     responses:
 *       200:
 *         description: Lista de contenidos
 *       500:
 *         description: Error al buscar contenido
 */

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

/**
 * @swagger
 * /contenido/{id}:
 *   get:
 *     summary: Obtener contenido por ID
 *     tags: [Contenido]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del contenido a obtener
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Contenido encontrado
 *       404:
 *         description: ID no encontrado
 *       500:
 *         description: Error al buscar el ID
 */

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

/**
 * @swagger
 * /contenido/filter/titulo:
 *   post:
 *     summary: Filtrar contenidos por título
 *     tags: [Contenido]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Lista de contenidos filtrados
 *       404:
 *         description: No existe contenido con ese título
 *       500:
 *         description: Error al filtrar por título
 */

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

/**
 * @swagger
 * /contenido/filter/categoria:
 *   get:
 *     summary: Filtrar contenidos por categoría
 *     tags: [Contenido]
 *     parameters:
 *       - name: categoria
 *         in: query
 *         required: true
 *         description: ID de la categoría para filtrar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de contenidos filtrados por categoría
 *       404:
 *         description: No hay datos con esa categoría
 *       500:
 *         description: Error al filtrar por categoría
 */

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

/**
 * @swagger
 * /contenido/filter/genero:
 *   get:
 *     summary: Filtrar contenidos por género
 *     tags: [Contenido]
 *     parameters:
 *       - name: genero
 *         in: query
 *         required: true
 *         description: Nombre del género para filtrar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de contenidos filtrados por género
 *       404:
 *         description: No hay datos con ese género
 *       500:
 *         description: Error al filtrar por género
 */

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

/**
 * @swagger
 * /contenido:
 *   post:
 *     summary: Crear nuevo contenido
 *     tags: [Contenido]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               reparto:
 *                 type: string
 *               generos:
 *                 type: integer
 *               categorias:
 *                 type: integer
 *               resumen:
 *                 type: string
 *               temporadas:
 *                 type: integer
 *               duracion:
 *                 type: string
 *               trailer:
 *                 type: string
 *               poster:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contenido creado exitosamente
 *       400:
 *         description: Todos los campos deben ser completados
 *       500:
 *         description: Error al crear contenido
 */

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

/**
 * @swagger
 * /contenido/{id}:
 *   put:
 *     summary: Actualizar contenido por ID
 *     tags: [Contenido]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del contenido a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               reparto:
 *                 type: string
 *               generos:
 *                 type: integer
 *               categorias:
 *                 type: integer
 *               resumen:
 *                 type: string
 *               temporadas:
 *                 type: integer
 *               duracion:
 *                 type: string
 *               trailer:
 *                 type: string
 *               poster:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contenido actualizado
 *       404:
 *         description: Datos no encontrados
 *       400:
 *         description: Todos los campos obligatorios deben ser completados
 *       500:
 *         description: Error al actualizar datos
 */

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
      return res.status(400).json({
        message: "Todos los campos obligatorios deben ser completados",
      });
    }

    // Actualizar el contenido
    await contenido.update(req.body);
    res.status(200).json(contenido);
  } catch (error) {
    console.error("Error actualizando datos:", error);
    res.status(500).json({ message: "Error actualizando datos", error });
  }
};

/**
 * @swagger
 * /contenido/{id}:
 *   delete:
 *     summary: Eliminar contenido por ID
 *     tags: [Contenido]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del contenido a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Contenido eliminado exitosamente
 *       404:
 *         description: Datos no encontrados
 *       500:
 *         description: Error al eliminar datos
 */

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
