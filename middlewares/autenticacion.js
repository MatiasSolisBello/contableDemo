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
    jwt.verify(token, config.SECRET_TOKEN, (err, decoded) => {
        if (err) {
            //401: No autorizado
            return res.status(401).json({
                message: 'Token no válido'
            });
        }
        //console.log('verificaToken: ', decoded);
       
        req.usuario = decoded;
        next();
    });
};

// Verificar Admin
let verificaAdmin = (req, res, next) => {
    const usuario = req.usuario;
    
    console.log('verificaAdmin: ',usuario.role);
    
    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            message: 'El usuario no es administrador'
        });
    }
}

// Verificar Bodega
let verificaBodega = (req, res, next) => {
    const usuario = req.usuario;
    
    console.log('verificaBodega: ',usuario.role);
    
    if (usuario.role === 'BODEGA_ROLE') {
        next();
    } else {
        return res.json({
            message: 'El usuario no es administrador de Bodega'
        });
    }
    
}

// Verificar Cliente
let verificaCliente = (req, res, next) => {
    const usuario = req.usuario;
    
    console.log('verificaCliente: ',usuario.role);
    
    if (usuario.role === 'CLIENTE_ROLE') {
        next();
    } else {
        return res.json({
            message: 'El usuario no es cliente'
        });
    }
}


module.exports = {
    verificaToken,
    verificaAdmin,
    verificaBodega,
    verificaCliente
}