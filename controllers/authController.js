const Usuario = require('../modelos/usuario');
const bcrypt = require('bcrypt');
const CONFIG = require('../config/config');
const jwt = require('jsonwebtoken');

function login(req,res){
    let correo = req.body.correo;
    let clave = req.body.clave;

    Usuario.findOne({correo})
    .then(usuario => {
        if(!usuario) return res.status(200).send({usuario});
        bcrypt.compare(clave, usuario.clave).then(match => {
            if(match){
                //Acceso
                payload = {
                    //rut: usuario.rut,
                    nombre: usuario.nombre,
                    //apellido: usuario.apellido,
                    //direccion: usuario.direccion,
                    //correo: usuario.correo,
                    //telefono: usuario.telefono,
                    rol: usuario.rol//.nombre

                }
                jwt.sign(payload, CONFIG.SECRET_TOKEN, function(error, token){
                    if(error){
                        res.status(500).send({error});
                    }else{
                        res.status(200).send({message: 'ACCESO', token});
                    }
                })
            }else{
                res.status(200).send({message: 'PASSWORD INCORRECTA'});
            }
        }).catch(error => {
            console.log(error);
            res.status(400).send({error});
        });
    }).catch(error => {
        console.log(error);
        res.status(400).send({error});
    });
}

module.exports = login;