const jwt = require('jsonwebtoken');
require('dotenv').config();

//------------------------------
// Verificar Token
//------------------------------
const verificaToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No estás autenticado" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ENV_SECRET_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(401).json({ 
                message: "Token no válido o expirado" 
            });
        }

        req.usuario = decoded;
        next();
    });
};


//------------------------------
// Verificar Admin
//------------------------------
const verificaAdmin = (req, res, next) => {
    const usuario = req.usuario;

    if (!usuario || usuario.role !== 'ADMIN_ROLE') {
        return res.status(403).json({
            message: 'El usuario no es administrador'
        });
    }

    next();
};



//------------------------------
// Verificar si es personal de la empresa(ADMIN O BODEGA)
//------------------------------
const verificaPersonal = (req, res, next) => {
    const usuario = req.usuario;

    if (!usuario || !['ADMIN_ROLE', 'BODEGA_ROLE'].includes(usuario.role)) {
        return res.status(403).json({
            message: 'El usuario no posee privilegios para acceder a estos datos'
        });
    }

    next();
};


module.exports = {
    verificaToken,
    verificaAdmin,
    verificaPersonal
}