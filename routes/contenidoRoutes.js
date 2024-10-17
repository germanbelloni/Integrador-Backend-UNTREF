const express = require('express');
const router = express.Router();
const contenidoController = require('../controllers/contenidoController')

// Routes for CRUD
router.get('/', contenidoController.getAllData) // Get all content

router.get('/:id', contenidoController.getDatabyId) // Get data by ID

router.get('/filter/titulo', contenidoController.filterDataByTitle)  //Filter by title

router.get('/filter/categoria', contenidoController.filterDatabyCategory)  //Filter by Category

router.get('/filter/genero', contenidoController.filterDatabyGenre)  //Filter by Genre

router.post('/', contenidoController.createData) // Add new content

router.put('/:id', contenidoController.updateData) // Update content by ID

//router.delete('/:id', contenidoController.deleteData) // Delete content by ID

//Routes that do not exist
router.use((req, res) => {
    res.status(404).json({ message: 'Endpoint fuera de servicio'})
})

module.exports = router;
    