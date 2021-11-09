'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RolSchema = Schema({
    nombre: {type: String, unique:true, required:true},
    descripcion: {type: String, required:true}
});

module.exports = mongoose.model('role',RolSchema);