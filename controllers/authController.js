const Usuario = require('../modelos/usuario');
const bcrypt = require('bcrypt');
const config = require("../config/config")
const jwt = require('jsonwebtoken');

/*-------------LOGIN USUARIO-------------*/
function login(req, res) {
    //datos a recibir
    let correo = req.body.correo;
    let clave = req.body.clave;

    //verificacion de datos recibidos
    Usuario.findOne({ correo }).then(usuario => {
        var token = jwt.sign({ id: usuario.id }, config.SECRET_TOKEN, {
            expiresIn: 86400 // 24 hours
        });

        //comparamos clave
        bcrypt.compare(clave, usuario.clave).then(match => {
            if (match) {
                payload = {
                    rut: usuario.rut,
                    nombre: usuario.nombre,
                    correo: usuario.correo,
                    role: usuario.role
                }

                jwt.sign(payload, config.SECRET_TOKEN,
                    function (error, token) {
                        if (error) {
                            res.status(500).send({
                                message: 'ERROR EN EL SERVIDOR 01: ', error
                            });
                        } else {
                            res.status(200).send({
                                message: 'ACCESO AUTORIZADO',
                                payload,
                                token
                            });
                        }
                    }
                )
            }else{
                res.status(200).send({
                    message: 'DATOS INGRESADOS DE FORMA INCORRECTA'
                });
            }
        }).catch(error => {
            console.log(error);
            res.status(400).send({
                message: 'ERROR EN EL SERVIDOR 02: ',error
            });
        });
    }).catch(error => {
        res.status(400).send({
            message: 'DATOS INGRESADOS DE FORMA INCORRECTA'
        });
    });
}

/*-------------REGISTRO USUARIO-------------*/
function register(req, res) {
    let usuario = new Usuario()
    usuario.rut = req.body.rut
    usuario.nombre = req.body.nombre
    usuario.correo = req.body.correo
    usuario.clave = req.body.clave

    usuario.save((err, usuariostore) => {
        if (err) res.status(500).send(`Error base de datos> ${err}`)

        res.status(200).send({ usuario: usuariostore })
    })
}

module.exports = { login, register };