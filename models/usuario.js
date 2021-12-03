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
UsuarioSchema.pre('save',function(next){
    const usuario = this;
    if(!usuario.isModified('clave')){
        return next();
    }
    bcrypt.genSalt(10).then(salts => {
        bcrypt.hash(this.clave,salts).then(hash => {
            this.clave = hash;
            next();
        }).catch(error => next(error));
    }).catch(error => next(error));
});

UsuarioSchema.pre('findOneAndUpdate', async function () {
    this._update.clave = await bcrypt.hash(this._update.clave, 10)
})

UsuarioSchema.pre('useFindAndModify', async function () {
    this._update.clave = await bcrypt.hash(this._update.clave, 10)
})

module.exports = mongoose.model('usuario',UsuarioSchema);
