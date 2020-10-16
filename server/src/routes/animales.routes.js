const { Router } = require('express');

const animalesController = require('../controllers/animales.controller.js');

// Ejecutar Enrutador
const router = Router();

// -------------------- Endpoints Animales - CRUD ---------------------------
// Obtener Animales
router.get('/', animalesController.obtenerAnimales);

// Obtener Animal
router.get('/:id', animalesController.obtenerAnimal);

// Crear Animal
router.post('/', animalesController.crearAnimal);

// Eliminar Animal
router.delete('/:id', animalesController.eliminarAnimal);


// Exportar Enrutador
module.exports = router;
