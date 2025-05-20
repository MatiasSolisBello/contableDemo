const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken');

/*-------------LOGIN USUARIO-------------*/
async function login(req, res) {
    const { correo, clave } = req.body;

    try {
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        const match = await bcrypt.compare(clave, usuario.clave);
        if (!match) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        const payload = {
            id: usuario._id,
            role: usuario.role
        };

        const token = jwt.sign(payload, process.env.ENV_SECRET_TOKEN, {
            algorithm: 'HS256',
            expiresIn: process.env.ENV_EXPIRE
        });

        res.status(200).json({
            message: 'Acceso autorizado',
            token,
            payload
        });

    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ message: 'Error del servidor', error });
    }
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
    const { refreshToken } = req.body;
    Session.deleteOne({ refreshToken });
    res.status(200).json({ message: 'Sesión cerrada correctamente' });
}
module.exports = { login, register, logout };