const { Router } = require('express');

const corralaesController = require('../controllers/corrales.controller.js');

// Ejecutar Enrutador
const router = Router();

// -------------------- Endpoints Corrales - CRUD ---------------------------
// Obtener Corrales
router.get('/', corralaesController.obtenerCorrales);

// Obtener Corral
router.get('/:id', corralaesController.obtenerCorral);

// Crear Corral
router.post('/', corralaesController.crearCorral);

// Eliminar Corral
router.delete('/:id', corralaesController.eliminarCorral);

// Agregar Animal al Corral
router.put('/:id', corralaesController.agregarAnimalCorral);



// Exportar Enrutador
module.exports = router;
