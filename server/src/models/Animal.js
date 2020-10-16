const { Schema, model } = require('mongoose');

const animalSchema = new Schema({
    code: {type: String, required: true},
    tipo: {type: String, required: true},
    nombre: {type: String, required: true},
    edad: {type: Number, required: true},
    restricciones: {type: Object, required: true}
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('Animal', animalSchema)