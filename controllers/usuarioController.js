'use strict'
var Usuario = require('../modelos/usuario')

/*-------------GUARDAR USUARIO-------------*/
function guardar(req,res) {

    //devolvemos respuesta en json
    let usuario = new Usuario()
    usuario.rut = req.body.rut
    usuario.nombre = req.body.nombre
    usuario.correo = req.body.correo
    usuario.clave = req.body.clave
    usuario.role = req.body.role

    usuario.save((err,usuariostore) => {
        if (err) res.status(500).send(`Error base de datos> ${err}`)

        res.status(200).send({usuario:usuariostore})
    })
}

/*-------------BUSCAR USUARIO-------------*/
function buscar(req,res){
    Usuario.find({}, (err,usuario) => {
        if(!usuario) 
        return res.status(404).send({
            message:'Error usuario no existe'
        })
        res.status(200).send({usuario})
    })//.populate('role', ['nombre', 'descripcion'])
}

/*-------------EDITAR USUARIO-------------*/
function editar(req,res){
    var usuarioId = req.params.id;
    var update = req.body;

    Usuario.findByIdAndUpdate(usuarioId, update,
    {new:true},(err, usuarioupdated) =>{
        if(err) return res.status(500).send({
            message: 'Error en el servidor, debes cambiar tu clave'
        });
        if(usuarioupdated){
            return res.status(200).send({
                usuario:usuarioupdated
            });
        }else{
            return res.status(404).send({
                message: 'No existe el usuario'
            });
        }
         
    });

}

/*-------------ELIMINAR USUARIO-------------*/
function borrar(req,res){
     let usuarioId = req.params.id
    Usuario.findByIdAndRemove(usuarioId, (err, usuarioRemoved) => {
        if(err) return res.status(500).send({ 
            message: 'Error en el servidor' 
        });
         
            if(usuarioRemoved){
                return res.status(200).send({
                    usuario: usuarioRemoved
                });
            }else{
                return res.status(404).send({
                    message: 'No existe el usuario'
                });
            }
         
    });

}

module.exports = {
    guardar,
    buscar, 
    editar,
    borrar  
};