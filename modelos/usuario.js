'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UsuarioSchema = Schema({
    rut: {type: String, unique:true, required:true},
    nombre: {type: String, required:true },
    correo: {type: String, required:true },
    clave: {type: String, required:true },
    role: {type: Schema.ObjectId, ref: "role", required:true}
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
