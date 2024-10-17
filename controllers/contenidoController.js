const Contenido = require('../models/contenido')
const Categoria = require('../models/categoria')
const Genero = require('../models/genero')
const Actor = require('../models/actor')
const Contenido_Actores = require('../models/contenido_actores')
const { sequelize } = require('sequelize')

//Obtener todos los datos
exports.getAllData = async (req, res) => {
    try {
        const contenidos = await Contenido.findAll({
            include: [Actor, Genero, Categoria]
        })
        res.status(200).json(contenidos)
    } catch (error) {
        console.log('Error buscando el contenido', error);
        res.status(500).json({ message: 'Error buscando el contenido', error})
    }
}

//Obtener datos por ID
exports.getDatabyId = async (req, res) => {
    try {
        const contenido = await Contenido.findbyPk(req.params.id,{
            include: [Actor, Genero, Categoria]
        })
        if (!contenido){
            return res.status(404).json({ message: 'Id no encontrado'})
        }
        res.status(200).json(contenido)
    } catch (error) {
        console.log('Error buscando los datos del ID', error);
        res.status(500).json({ message: 'Error buscando los datos del ID', error})
    }
    
}

//Filtrar datos por titulo
exports.filterDataByTitle = async (req, res) => {
    const { titulo } = req.query
    try {
        const contenidos = await Contenido.findAll({
            where: {
                titulo: {
                    [sequelize.like] : `%${titulo}%`
                }
            }
        })

        if (contenidos.length === 0) {
            return res.status(404).json({ message: 'No existe contenido con ese titulo'})
        }

        res.status(200).json(contenidos)
    } catch (error) {
        console.log('Error filtrando por titulo', error);
        res.status(500).json({ message: 'Erorr filtrando por titulo'}, error)
    }
}

//Filtrar datos por categoria
exports.filterDatabyCategory = async (req, res) => {
    const { categoria } = req.query
    try {
        const contenidos = await Contenido.findAll({
            include: [{
                model: Categoria,
                where: {
                    nombre: {
                        [sequelize.like]: `%${categoria}%`
                    }
                }
            }]
        });

        if (contenidos.length === 0) {
            return res.status(404).json({ message: 'No hay datos con esa categoria' });
        }

        res.status(200).json(contenidos);
    } catch (error) {
        console.error('Error filtrando por categoria:', error);
        res.status(500).json({ message: 'Error filtrando por categoria', error });
    }
}

//Filtrar datos por genero
exports.filterDatabyGenre = async (req, res) => {
    const { genero } = req.query;
    try {
        const contenidos = await Contenido.findAll({
            include: [{
                model: Genero,
                where: {
                    nombre: {
                        [sequelize.like]: `%${genero}%`
                    }
                }
            }]
        });

        if (contenidos.length === 0) {
            return res.status(404).json({ message: 'No hay datos con ese genero' });
        }

        res.status(200).json(contenidos);
    } catch (error) {
        console.error('Error filtrando con ese genero:', error);
        res.status(500).json({ message: 'Error filtrando con ese genero', error });
    }
}

//Crea nuevos datos
exports.createData = async (req, res) => {
    const { titulo, categoria_id, gen, resumen, temporadas, duracion, trailer, poster } = req.body;

    if (!titulo || !categoria_id || !gen || !resumen || !trailer || !poster) {
        return res.status(400).json({ message: 'Todos los campos se deben completar' });
    }

    try {
        const nuevoContenido = await Contenido.create(req.body);
        res.status(201).json(nuevoContenido);
    } catch (error) {
        console.error('Error creando pelicula:', error);
        res.status(500).json({ message: 'Error creando pelicula', error });
    }

}

// Actualizar Datos
exports.updateData = async (req, res) => {
    try {
        const contenido = await Contenido.findByPk(req.params.id);
        if (!contenido) {
            return res.status(404).json({ message: 'Datos no encontrados' });
        }
        await contenido.update(req.body);
        res.status(200).json(contenido);
    } catch (error) {
        console.error('Error actualizando datos:', error);
        res.status(500).json({ message: 'Error actualizando datos', error });
    }
};