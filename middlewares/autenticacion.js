const jwt = require('jsonwebtoken');
const config = require("../config/config")

// Verificar Token
let verificaToken = (req, res, next) => {
    //obtengo el token
    let token = req.get('token');

    //si token no existe
    if (!token) {
        return res.status(403).send({ 
            message: "Token no entregado" 
        });
    }

    //verificar 
    jwt.verify(token, config.SECRET_TOKEN ,(err, decoded) => {
        if (err) {
            //401: No autorizado
            return res.status(401).json({
                message: 'Token no válido'
            });
        }
        req.usuario = decoded.usuario;
        next();
    });
};

// Verificar Admin
let verificaAdmin = (req, res, next) => {
    let usuario = req.usuario;
    
    if (usuario.role === "618a885eaf40e047ec8ab614") {
        next();
    } else {
        return res.json(401)({
            message: 'El usuario no posee los permisos necesarios'
        });
    }
}

// Verificar Bodega
let verificaBodega = (req, res, next) => {
    let usuario = req.usuario;
    if (usuario.role === '618abf68b54c1b21885faece') {
        next();
    } else {
        return res.json(401)({
            message: 'El usuario no posee los permisos necesarios'
        });
    }
}

// Verificar Cliente
let verificaCliente = (req, res, next) => {
    let usuario = req.usuario;
    if (usuario.role === '618abf82b54c1b21885faed0') {
        next();
    } else {
        return res.json(401)({
            message: 'El usuario no posee los permisos necesarios'
        });
    }
}


module.exports = {
    verificaToken,
    verificaAdmin,
    verificaBodega,
    verificaCliente
}