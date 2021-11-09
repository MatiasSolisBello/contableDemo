'use strict'
var Bodega = require('../modelos/bodega.js')


function guardar(req,res) {
    let bodega = new Bodega()
    bodega.numero = req.body.numero
    bodega.nombre = req.body.nombre
    bodega.direccion = req.body.direccion
    bodega.descripcion = req.body.descripcion
    bodega.estado = req.body.estado
    bodega.usuario = req.body.usuario
    bodega.save((err,bodegastore) => {
        if (err) res.status(500).send(`Error base de datos> ${err}`)
        res.status(200).send({bodega:bodegastore})
    })

}

function buscar(req,res){
    Bodega.find({}, (err,bodega) => {
        if(!bodega) return res.status(404).send({
            message:'Error bodega no existe'
        })
        res.status(200).send({bodega})
    })//.populate('usuario', ['rut', 'nombre', 'apellido', 'correo', 'telefono'])
}

function editar(req,res){
    let bodegaId = req.params.id
    let update = req.body
    Bodega.findByIdAndUpdate(bodegaId, update,{new:true},(err, bodegaupdated) =>{
        if(err) return res.status(500).send({
            message: 'Error en el servidor'
        });
         
        if(bodegaupdated){
            return res.status(200).send({
                bodega:bodegaupdated
            });
        }else{
            return res.status(404).send({
                message: 'No existe la bodega'
            });
        }
         
    });

}

function borrar(req,res){
    let bodegaId = req.params.id
    Bodega.findByIdAndRemove(bodegaId, (err, bodegaRemoved) => {
       if(err) return res.status(500).send({ 
           message: 'Error en el servidor' 
        });
        
        if(bodegaRemoved){
            return res.status(200).send({
                bodega: bodegaRemoved
            });
        }else{
            return res.status(404).send({
                message: 'No existe la bodega'
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