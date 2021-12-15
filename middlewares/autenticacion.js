const jwt = require('jsonwebtoken');
const dotenv = require("dotenv")

//------------------------------
// Verificar Token
//------------------------------
let verificaToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.ENV_SECRET_TOKEN, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: 'Token no válido'
                });
            }
            req.usuario = decoded;
            next();
        });
    } else {
        res.status(401).json({
            message: "No estas autenticado"
        });
    }
};


//------------------------------
// Verificar Admin
//------------------------------
let verificaAdmin = (req, res, next) => {
    const usuario = req.usuario;

    console.log('verificaAdmin: ', usuario.role);

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

    console.log('verificaPersonal: ', usuario.role);

    if (usuario.role === 'BODEGA_ROLE' || usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            message: 'El usuario no posee privilegios para acceder a estos datos'
        });
    }

}

module.exports = {
    verificaToken,
    verificaAdmin,
    verificaPersonal
}