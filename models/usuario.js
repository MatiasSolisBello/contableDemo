'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

//funcion con enum + message 
let rolesValidos = {
    values: ['ADMIN_ROLE', 'BODEGA_ROLE', 'CLIENTE_ROLE'],
    message: '{VALUE} no es un rol válido'
};


const UsuarioSchema = Schema({
    rut: {type: String, unique:[true, 'Rut debe ser unico'], required:true},
    nombre: {type: String, required:true },
    correo: {type: String, unique:[true, 'correo debe ser unico'], required:true },
    clave: {type: String, required:true },
    role: {type: String, default: 'CLIENTE_ROLE', enum: rolesValidos}
})

//------------------------------------------------------------
//      ENCRIPTACION DE CONTRASEÑAS VIA POST Y PUT
//------------------------------------------------------------
UsuarioSchema.pre('save', async function (next) {
    if (!this.isModified('clave')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.clave = await bcrypt.hash(this.clave, salt);
        next();
    } catch (error) {
        next(error);
    }
});


UsuarioSchema.pre('findOneAndUpdate', async function (next) {
    if (this._update.clave) {
        const hash = await bcrypt.hash(this._update.clave, 10);
        this._update.clave = hash;
    }
    next();
});

// OBSOLETO
//UsuarioSchema.pre('useFindAndModify', async function () {
//    this._update.clave = await bcrypt.hash(this._update.clave, 10)
//})

module.exports = mongoose.model('usuario',UsuarioSchema);
