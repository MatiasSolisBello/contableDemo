'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BodegaSchema = Schema({
    numero: {type: Number, required:true},
    nombre: {type: String, required:true},
    direccion: {type: String, required:true},
    descripcion: {type: String, required:true},
    estado: {
        type: String, required:true, 
        enum: ['EN Mantencion', 'Abierto', 'Cerrado'] 
    },    
    usuario: {type: Schema.ObjectId, ref: "usuario", required:true},      
})
module.exports = mongoose.model('bodega',BodegaSchema);