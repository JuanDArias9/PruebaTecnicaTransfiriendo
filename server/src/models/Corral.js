const { Schema, model } = require('mongoose');
const Animal = require('../models/Animal');

const corralSchema = new Schema({
    code: {type: String, required: true},
    nombre: {type: String, required: true},
    tipoAnimalesPermitidos: {type: [String], required: true},
    capacidad: {type: Number, required: true},
    animales: {type:[], required: false}
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('Corral', corralSchema);