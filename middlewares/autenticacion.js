const jwt = require('jsonwebtoken');
const config = require("../config/config")

//------------------------------
// Verificar Token
//------------------------------
let verificaToken = (req, res, next) => {
    let token = req.get('token');

    if (!token) {
        return res.status(403).send({
            message: "Token no entregado"
        });
    }

    jwt.verify(token, config.SECRET_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: 'Token no válido'
            });
        }
        req.usuario = decoded;
        next();
    });
};


//------------------------------
// Verificar Admin
//------------------------------
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



//------------------------------
// Verificar si es personal de la empresa(ADMIN O BODEGA)
//------------------------------
let verificaPersonal = (req, res, next) => {
    const usuario = req.usuario;
    
    console.log('verificaPersonal: ',usuario.role);
    
    if (usuario.role === 'BODEGA_ROLE' || usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            message: 'El usuario no es personal de la empresa'
        });
    }
    
}

module.exports = {
    verificaToken,
    verificaAdmin,
    verificaPersonal
}