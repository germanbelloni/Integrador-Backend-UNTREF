const Contenido = require("../models/contenido");
const Categoria = require("../models/categoria");
const Genero = require("../models/genero");
const Actor = require("../models/actor");

const { sequelize, Op } = require("sequelize");

/**
 * @swagger
 * /contenido:
 *   get:
 *     summary: Obtener todos los contenidos
 *     tags: [Contenido]
 *     responses:
 *       200:
 *         description: Lista de contenidos obtenida exitosamente.
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID del contenido.
 *               titulo:
 *                 type: string
 *                 description: Título del contenido.
 *               resumen:
 *                 type: string
 *                 description: Resumen del contenido.
 *               temporadas:
 *                 type: integer
 *                 description: Número de temporadas (si aplica).
 *               duracion:
 *                 type: string
 *                 description: Duración del contenido.
 *               trailer:
 *                 type: string
 *                 description:
 */
exports.getAllData = async (req, res) => {
  try {
    const contenidos = await Contenido.findAll({
      include: [
        {
          model: Categoria,
          as: "categoria",
        },
        {
          model: Genero,
          as: "genero",
          through: { attributes: [] },
        },
        {
          model: Actor,
          as: "actor",
          through: { attributes: [] },
        },
      ],
    });
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
 *     summary: Obtener un contenido por su ID
 *     tags: [Contenido]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del contenido que se desea obtener
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Contenido encontrado
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: ID del contenido.
 *             titulo:
 *               type: string
 *               description: Título del contenido.
 *             resumen:
 *               type: string
 *               description: Resumen del contenido.
 *             temporadas:
 *               type: integer
 *               description: Número de temporadas (si aplica).
 *             duracion:
 *               type: string
 *               description: Duración del contenido.
 *             trailer:
 *               type: string
 *               description: URL del tráiler.
 *             poster:
 *               type: string
 *               description: Ruta del póster.
 *             categoria:
 *               type: object
 *               properties:
 *                 id_categoria:
 *                   type: integer
 *                   description: ID de la categoría.
 *                 nombre:
 *                   type: string
 *                   description: Nombre de la categoría.
 *             genero:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_genero:
 *                     type: integer
 *                     description: ID del género.
 *                   nombre:
 *                     type: string
 *                     description: Nombre del género.
 *             actor:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_actor:
 *                     type: integer
 *                     description: ID del actor.
 *                   nombre:
 *                     type: string
 *                     description: Nombre del actor.
 *       404:
 *         description: No se encontró el contenido con ese ID.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: Mensaje de error.
 *       500:
 *         description: Error al buscar el contenido por ID.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: Descripción del error.
 *             error:
 *               type: string
 *               description: Detalles del error.
 */
exports.getDatabyId = async (req, res) => {
  try {
    const contenido = await Contenido.findByPk(req.params.id, {
      include: [
        {
          model: Categoria,
          as: "categoria",
        },
        {
          model: Genero,
          as: "genero",
          through: { attributes: [] },
        },
        {
          model: Actor,
          as: "actor",
          through: { attributes: [] },
        },
      ],
    });
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
 *                 description: El título del contenido a buscar.
 *                 example: "The Mandalorian"
 *     responses:
 *       200:
 *         description: Lista de contenidos que coinciden con el título
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contenido'
 *       400:
 *         description: El parámetro 'titulo' es obligatorio
 *       404:
 *         description: No existe contenido con ese título
 *       500:
 *         description: Error al filtrar los contenidos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Contenido:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del contenido
 *           example: 1
 *         titulo:
 *           type: string
 *           description: Título del contenido
 *           example: "The Mandalorian"
 *         resumen:
 *           type: string
 *           description: Resumen del contenido
 *           example: "La historia de un mandaloriano..."
 *         duracion:
 *           type: integer
 *           description: Duración del contenido en minutos
 *           example: 50
 *         trailer:
 *           type: string
 *           description: Enlace al tráiler del contenido
 *           example: "https://link.al.trailer"
 *         poster:
 *           type: string
 *           description: URL de la imagen del póster
 *           example: "https://link.al.poster.jpg"
 *         categoria:
 *           $ref: '#/components/schemas/Categoria'
 *         genero:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Genero'
 *         actor:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Actor'
 *     Categoria:
 *       type: object
 *       properties:
 *         id_categoria:
 *           type: integer
 *           description: ID de la categoría
 *           example: 1
 *         nombre:
 *           type: string
 *           description: Nombre de la categoría
 *           example: "Serie"
 *     Genero:
 *       type: object
 *       properties:
 *         id_genero:
 *           type: integer
 *           description: ID del género
 *           example: 1
 *         nombre_genero:
 *           type: string
 *           description: Nombre del género
 *           example: "Sci-Fi"
 *     Actor:
 *       type: object
 *       properties:
 *         id_actor:
 *           type: integer
 *           description: ID del actor
 *           example: 1
 *         nombre:
 *           type: string
 *           description: Nombre del actor
 *           example: "Pedro Pascal"
 */

exports.filterDataByTitle = async (req, res) => {
  const { titulo } = req.body; // Usa body en lugar de query
  try {
    if (!titulo) {
      return res
        .status(400)
        .json({ message: "El parámetro 'titulo' es obligatorio" });
    }

    const contenidos = await Contenido.findAll({
      where: {
        titulo: {
          [Op.like]: `%${titulo}%`, // Usamos `Op.like` para buscar coincidencias parciales
        },
      },
      include: [
        {
          model: Categoria,
          as: "categoria",
        },
        {
          model: Genero,
          as: "genero",
          through: { attributes: [] },
        },
        {
          model: Actor,
          as: "actor",
          through: { attributes: [] },
        },
      ],
    });

    if (contenidos.length === 0) {
      return res
        .status(404)
        .json({ message: "No existe contenido con ese título" });
    }

    res.status(200).json(contenidos);
  } catch (error) {
    console.log("Error filtrando por título", error);
    res.status(500).json({ message: "Error filtrando por título", error });
  }
};

/**
 * @swagger
 * /contenido/filter/categoria/:
 *   get:
 *     summary: Filtrar contenidos por categoría
 *     tags: [Contenido]
 *     parameters:
 *       - in: query
 *         name: categoria
 *         required: true
 *         schema:
 *           type: integer
 *           description: ID de la categoría a filtrar
 *           example: 1
 *     responses:
 *       200:
 *         description: Lista de contenidos filtrados por categoría
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contenido'
 *       400:
 *         description: El parámetro 'categoria' es obligatorio o inválido
 *       404:
 *         description: No hay contenidos con esa categoría
 *       500:
 *         description: Error filtrando por categoría
 */

exports.filterDatabyCategory = async (req, res) => {
  let { categoria } = req.query;

  // Verificar si categoria está presente en la URL
  if (!categoria) {
    return res
      .status(400)
      .json({ message: "El parámetro 'categoria' es obligatorio" });
  }

  // Convertir 'categoria' a un número entero
  categoria = parseInt(categoria, 10);

  if (isNaN(categoria)) {
    return res
      .status(400)
      .json({ message: "El parámetro 'categoria' debe ser un número válido" });
  }

  try {
    const contenidos = await Contenido.findAll({
      where: {
        id_categoria: categoria, // Usar el número entero para la consulta
      },
      include: [
        {
          model: Categoria,
          as: "categoria",
        },
        {
          model: Genero,
          as: "genero",
          through: { attributes: [] },
        },
        {
          model: Actor,
          as: "actor",
          through: { attributes: [] },
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
 * /contenido/filter/genero/:
 *   get:
 *     summary: Filtrar contenidos por género
 *     tags: [Contenido]
 *     parameters:
 *       - in: query
 *         name: genero
 *         required: true
 *         schema:
 *           type: string
 *           description: Nombre o parte del nombre del género
 *           example: Action
 *     responses:
 *       200:
 *         description: Lista de contenidos filtrados por género
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contenido'
 *       400:
 *         description: El parámetro 'genero' es obligatorio
 *       404:
 *         description: No hay contenidos con ese género
 *       500:
 *         description: Error filtrando por género
 */

exports.filterDatabyGenre = async (req, res) => {
  const { genero } = req.query;

  // Verificar si se pasa el parámetro 'genero'
  if (!genero) {
    return res
      .status(400)
      .json({ message: "El parámetro 'genero' es obligatorio" });
  }

  try {
    const contenidos = await Contenido.findAll({
      include: [
        {
          model: Genero,
          as: "genero", // Especifica el alias usado en la relación
          where: {
            nombre_genero: {
              [Op.like]: `%${genero}%`, // Filtro de género por nombre
            },
          },
          through: { attributes: [] }, // Si es una relación de muchos a muchos
        },
      ],
    });
    

    // Verificar si se encontraron contenidos
    if (contenidos.length === 0) {
      return res.status(404).json({ message: "No hay datos con ese género" });
    }

    // Devolver los contenidos encontrados
    res.status(200).json(contenidos);
  } catch (error) {
    console.error("Error filtrando con ese género:", error);
    res.status(500).json({ message: "Error filtrando con ese género", error });
  }
};

/**
 * @swagger
 * /contenido:
 *   post:
 *     summary: Crear un nuevo contenido
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
 *                 description: Título del contenido.
 *               reparto:
 *                 type: array
 *                 items:
 *                   type: integer
 *                   description: IDs de los actores asociados al contenido.
 *               generos:
 *                 type: array
 *                 items:
 *                   type: integer
 *                   description: IDs de los géneros asociados al contenido.
 *               categoria:
 *                 type: integer
 *                 description: ID de la categoría del contenido.
 *               resumen:
 *                 type: string
 *                 description: Resumen del contenido.
 *               temporadas:
 *                 type: integer
 *                 description: Número de temporadas (si aplica).
 *               duracion:
 *                 type: string
 *                 description: Duración del contenido.
 *               trailer:
 *                 type: string
 *                 description: URL del tráiler del contenido.
 *               poster:
 *                 type: string
 *                 description: Ruta del póster del contenido.
 *     responses:
 *       201:
 *         description: Contenido creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito.
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: ID del contenido creado.
 *                     titulo:
 *                       type: string
 *                       description: Título del contenido.
 *                     resumen:
 *                       type: string
 *                       description: Resumen del contenido.
 *                     temporadas:
 *                       type: integer
 *                       description: Número de temporadas (si aplica).
 *                     duracion:
 *                       type: string
 *                       description: Duración del contenido.
 *                     trailer:
 *                       type: string
 *                       description: URL del tráiler.
 *                     poster:
 *                       type: string
 *                       description: Ruta del póster.
 *                     categoria:
 *                       type: object
 *                       properties:
 *                         id_categoria:
 *                           type: integer
 *                           description: ID de la categoría del contenido.
 *                         nombre:
 *                           type: string
 *                           description: Nombre de la categoría.
 *                     genero:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id_genero:
 *                             type: integer
 *                             description: ID del género.
 *                           nombre_genero:
 *                             type: string
 *                             description: Nombre del género.
 *                     actor:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id_actor:
 *                             type: integer
 *                             description: ID del actor.
 *                           nombre:
 *                             type: string
 *                             description: Nombre del actor.
 *       400:
 *         description: Géneros o actores no encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *       500:
 *         description: Error al crear contenido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error.
 *                 error:
 *                   type: string
 *                   description: Detalles del error.
 */
exports.createData = async (req, res) => {
  console.log(req.body);
  const {
    titulo,
    reparto,
    generos,
    categoria,
    resumen,
    temporadas,
    duracion,
    trailer,
    poster,
  } = req.body;

  try {
    // Crear el contenido
    const nuevoContenido = await Contenido.create({
      titulo,
      resumen,
      temporadas,
      duracion,
      trailer,
      poster,
      id_categoria: categoria, // ID de la categoría en la tabla `Contenido`
    });

    // Asociar los géneros
    if (generos && generos.length > 0) {
      const generosEncontrados = await Genero.findAll({
        where: { id_genero: generos }, // Utiliza el nombre correcto de la columna
      });

      if (generosEncontrados.length > 0) {
        await nuevoContenido.addGenero(generosEncontrados);
      } else {
        return res.status(400).json({ message: "Géneros no encontrados" });
      }
    }

    // Asociar los actores (reparto)
    if (reparto && reparto.length > 0) {
      const actoresEncontrados = await Actor.findAll({
        where: { id_actor: reparto }, // Encontrar actores por ID
      });
      await nuevoContenido.addActor(actoresEncontrados);
    }

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
 *     summary: Actualizar un contenido existente
 *     tags: [Contenido]
 *     parameters:
 *       - in: path
 *         name: id
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
 *                 description: Título del contenido.
 *               categorias:
 *                 type: integer
 *                 description: ID de la categoría del contenido.
 *               resumen:
 *                 type: string
 *                 description: Resumen del contenido.
 *               trailer:
 *                 type: string
 *                 description: URL del tráiler del contenido.
 *               poster:
 *                 type: string
 *                 description: Ruta del póster del contenido.
 *               generos:
 *                 type: array
 *                 items:
 *                   type: integer
 *                   description: IDs de los géneros asociados al contenido.
 *               reparto:
 *                 type: array
 *                 items:
 *                   type: integer
 *                   description: IDs de los actores asociados al contenido.
 *     responses:
 *       200:
 *         description: Contenido actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito.
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: ID del contenido actualizado.
 *                     titulo:
 *                       type: string
 *                       description: Título del contenido.
 *                     resumen:
 *                       type: string
 *                       description: Resumen del contenido.
 *                     trailer:
 *                       type: string
 *                       description: URL del tráiler.
 *                     poster:
 *                       type: string
 *                       description: Ruta del póster.
 *                     categoria:
 *                       type: object
 *                       properties:
 *                         id_categoria:
 *                           type: integer
 *                           description: ID de la categoría.
 *                         nombre:
 *                           type: string
 *                           description: Nombre de la categoría.
 *                     genero:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id_genero:
 *                             type: integer
 *                             description: ID del género.
 *                           nombre_genero:
 *                             type: string
 *                             description: Nombre del género.
 *                     actor:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id_actor:
 *                             type: integer
 *                             description: ID del actor.
 *                           nombre:
 *                             type: string
 *                             description: Nombre del actor.
 *       400:
 *         description: Todos los campos obligatorios deben ser completados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *       404:
 *         description: Contenido no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error cuando el contenido no se encuentra.
 *       500:
 *         description: Error al actualizar contenido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error.
 *                 error:
 *                   type: string
 *                   description: Detalles del error.
 */
exports.updateData = async (req, res) => {
  try {
    const contenido = await Contenido.findByPk(req.params.id);

    // Verificar si el contenido existe
    if (!contenido) {
      return res.status(404).json({ message: "Datos no encontrados" });
    }

    // Validación de campos obligatorios
    const { titulo, categorias, resumen, trailer, poster, generos, reparto } =
      req.body;
    if (!titulo || !categorias || !resumen || !trailer || !poster) {
      return res.status(400).json({
        message: "Todos los campos obligatorios deben ser completados",
      });
    }

    // Actualizar los datos principales del contenido
    await contenido.update({
      titulo,
      resumen,
      trailer,
      poster,
      id_categoria: categorias, // Actualizamos la categoría
    });

    // Actualizar relación de géneros
    if (generos && generos.length > 0) {
      const generosEncontrados = await Genero.findAll({
        where: { id_genero: generos },
      });
      await contenido.setGenero(generosEncontrados); // Reemplaza la relación existente con los nuevos géneros
    }

    // Buscar actores por id_actor en lugar de id
    if (reparto && reparto.length > 0) {
      const actoresEncontrados = await Actor.findAll({
        where: { id_actor: reparto }, // Buscar actores por id_actor
      });

      // Asociar los actores con el nuevo contenido
      await contenido.addActor(actoresEncontrados);
    }

    res.status(200).json({
      message: "Contenido actualizado exitosamente",
      data: contenido,
    });
  } catch (error) {
    console.error("Error actualizando datos:", error);
    res
      .status(500)
      .json({ message: "Error actualizando datos", error: error.message });
  }
};

/**
 * @swagger
 * /contenido/{id}:
 *   delete:
 *     summary: Eliminar un contenido existente
 *     tags: [Contenido]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del contenido a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Contenido eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito.
 *       404:
 *         description: Contenido no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error cuando el contenido no se encuentra.
 *       500:
 *         description: Error al eliminar contenido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error.
 *                 error:
 *                   type: string
 *                   description: Detalles del error.
 */

exports.deleteData = async (req, res) => {
  try {
    // Buscar el contenido por ID
    const contenido = await Contenido.findByPk(req.params.id);

    // Verificar si el contenido existe
    if (!contenido) {
      return res.status(404).json({ message: "Datos no encontrados" });
    }

    await contenido.setGenero([]); // Elimina asociaciones con géneros
    await contenido.setActor([]); // Elimina asociaciones con actores

    // Eliminar el contenido
    await contenido.destroy();
    res.status(200).json({ message: "Contenido eliminado exitosamente" });
  } catch (error) {
    console.error("Error eliminando datos:", error);
    res
      .status(500)
      .json({ message: "Error eliminando datos", error: error.message });
  }
};
