const animalController = {};
const Animal = require('../models/Animal');

// Obtener Animales
animalController.obtenerAnimales = async (req, res) => {
    const animales = await Animal.find()
    res.json(animales)
};

// Obtener Animal
animalController.obtenerAnimal = async (req, res) => {
    const animal = await Animal.findById(req.params.id)
    res.json(animal);
};

// Crear Animal
animalController.crearAnimal = async (req, res) => {
    const newAnimal = new Animal(req.body)
    await newAnimal.save()
    res.send({message: 'Animal Creado. Code: ' + newAnimal.code});
};

// Eliminar Animal
animalController.eliminarAnimal = async (req, res) => {
    const animal = await Animal.findByIdAndDelete(req.params.id)
    res.send({message: 'Animal Eliminado'});
};

module.exports = animalController;