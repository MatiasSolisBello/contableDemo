'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductoSchema = Schema({
    nombre: {type: String, required:true },
    descripcion: {type: String, required:true },
    precio: {type: Number, required:true },
    stock: {type: Number, required:true },
    imagen: {type: String, required:false },
    bodega: {type: Schema.ObjectId, ref: "bodega", required:true},
})
module.exports = mongoose.model('producto',ProductoSchema);