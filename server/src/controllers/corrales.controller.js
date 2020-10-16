const corralesController = {};
const Corral = require('../models/Corral');

// Obtener Corrales
corralesController.obtenerCorrales = async (req, res) => {
    const corrales = await Corral.find()
    res.json(corrales)
};

// Obtener Corral
corralesController.obtenerCorral = async (req, res) => {
    const corral = await Corral.findById(req.params.id)
    res.json(corral);
};

// Crear Corral
corralesController.crearCorral = async (req, res) => {
    const newCorral = new Corral(req.body)
    await newCorral.save()
    res.send({message: 'Corral Creado. Code: ' + newCorral.code});
};

// Eliminar Corral
corralesController.eliminarCorral = async (req, res) => {
    const corral = await Corral.findByIdAndDelete(req.params.id)
    res.send({message: 'Corral Eliminado'});
};

// Agregar Animal al Corral
corralesController.agregarAnimalCorral = async (req, res) => {

    const corral = await Corral.findById(req.params.id) 
    let animal = req.body;

    if(corral.animales.length > 0) {
        
        // Validar Existencia Animal en el Corral
        let existeAnimal = validarExistenciaAnimal(corral.animales, animal.id);

        if (existeAnimal) {
            res.send({status: false, mensaje: "El " + animal.nombre + " con Code: " + animal.code + " ya existe en el Corral especificado. Code Corral: " + corral.code + " - Nombre Corral: " + corral.nombre});
        }
    }

    // Validar Capacidad del Corral
    if(corral.animales.length < corral.capacidad) {
        console.log("Capacidad Corral Aprobada...");

        // Validar el tipo de animales permitidos por el Corral y el tipo de animal a agregar
        let errorTipo =  validarTipo(corral.tipoAnimalesPermitidos, animal.tipo); 

        if(!errorTipo) {

            // Validar si el animal puede convivir con los tipos de animales permitidos por el Corral
            let errorRestriccionesAnimales = validarRestriccionAnimal(corral.tipoAnimalesPermitidos, animal.restricciones.noPuedeHabitar);

            console.log(errorRestriccionesAnimales);
            if(errorRestriccionesAnimales) {                
                res.send({status: false, mensaje: "El " + animal.nombre + " no puede convivir con el tipo de animales permitidos por este corral. Code Corral: " + corral.code + " - Nombre Corral: " + corral.nombre});
            }else {
                corral.animales.push(animal);
                console.log(corral);
                await Corral.findByIdAndUpdate(req.params.id, corral)
                res.send({message: 'Animal agregado exitosamente al Corral Code: ' + corral.code + ' - Nombre: ' + corral.nombre});
            }
        }
        else {
            res.send({status: false, mensaje: "Tipo del Animal no es permitido por el corral. Code: " + corral.code + " - Nombre: " + corral.nombre});
        }
    }
    else{
        res.send({status: false, mensaje: "Capacidad Maxima del Corral es Superada"});
    }    
};

// Validar si existe Animal en el Corral
function validarExistenciaAnimal(animalesCorral, idAnimal) {

    let existe = false;

    for(let i=0; i < animalesCorral.length; i++) {
        if(animalesCorral[i].id === idAnimal) {
            existe = true;
            break;
        }
    }
    
    return existe;
}

// Validar Tipo Corral y Tipo Animal
function validarTipo(tiposPermitidosCorral, tipoAnimal) {

    let errorTipo =  tiposPermitidosCorral.indexOf(tipoAnimal); 

    // Si encuentra que el Corral permite el tipo de Animal, returna Error = false
    return (errorTipo != -1) ? false : true;
}

// Validar Restricciones Animal - Animales permitidos para compartir corral
function validarRestriccionAnimal(tiposPermitidosCorral, tiposNoPuedeHabitar) {

    let errorRestriccion =  false;

    for(let i=0; i < tiposNoPuedeHabitar.length; i++){

        let result = tiposPermitidosCorral.indexOf(tiposNoPuedeHabitar[i]);

        console.log(result);

        // Si encuentra que uno de los tipos de animales restringidos para convivir del animal a agregar, se encuentra en el Corral, retorna error = true

        if(result != -1){
            errorRestriccion = true;
            break;
        }       
    }

    return errorRestriccion;
}

module.exports = corralesController;