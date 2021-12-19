const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken');

/*-------------LOGIN USUARIO-------------*/
function login(req, res) {
    //datos a recibir
    let correo = req.body.correo;
    let clave = req.body.clave;

    console.log(correo, clave);

    //verificacion de datos recibidos
    Usuario.findOne({ correo }).then(usuario => {
        var token = jwt.sign(
            { id: usuario._id },
            process.env.ENV_SECRET_TOKEN,
            { expiresIn: process.env.ENV_EXPIRE }
        );

        console.log('Login: ', expiresIn)

        //comparamos clave
        bcrypt.compare(clave, usuario.clave).then(match => {
            if (match) {
                payload = {
                    nombre: usuario.nombre,
                    role: usuario.role
                }

                jwt.sign(payload, process.env.ENV_SECRET_TOKEN,
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
            } else {
                res.status(200).send({
                    message: 'DATOS INGRESADOS DE FORMA INCORRECTA'
                });
            }
        }).catch(error => {
            console.log(error);
            res.status(400).send({
                message: 'ERROR EN EL SERVIDOR 02: ', error
            });
        });
    }).catch(error => {
        res.status(400).send({
            message: 'DATOS INGRESADOS DE FORMA INCORRECTA'
        });
    });
}

/*-------------REGISTRO USUARIO-------------*/
const register = async (req, res) => {
    const usuario = req.body;
    const newUsuario = new Usuario(usuario);
    try {
        await newUsuario.save();
        res.status(201).json(newUsuario);
    } catch (error) {
        res.status(409).json({ mensaje: error });
    }
}


/*-------------REFRESH TOKEN-------------*/
function logout(req, res) {
    const refreshToken = req.body.token;
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    res.status(200).json("You logged out successfully.");
}
module.exports = { login, register, logout };