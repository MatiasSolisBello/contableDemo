const jwt = require('jsonwebtoken');
const CONFIG = require('../config/config');

module.exports = function(req,res,next){
    /*
    //si path es distinto de /login
    if(req.path != '/login'){
        if(req.headers.authorization){

            
            //conseguir token de header/authorization de postman
            let token = req.headers.authorization.split(' ')[1];
            console.log('Token:', token);
            
            //verificar token con secret_key
            jwt.verify(token,CONFIG.SECRET_TOKEN,function(error,decoded){
                if(error) return res.status(403).send({message: 'No tienes los permisos suficientes',error});
                
                //si metodo es distinto de GET
                if(req.method != 'GET'){
                    //acceso POST-PUT-DELETE
                    if(decoded.rol == 'admin') next();
                    else res.status(403).send({message: 'No tienes los permisos suficientes'});
                }else{
                    
                    next();
                }
            });
        }else res.status(403).send({message: 'No tienes los permisos suficientes'});
    }else next();
    */
}


