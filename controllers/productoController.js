'use strict'
var Producto = require('../modelos/producto.js')

//Creamos un método en el controlador
function guardar(req,res) {
    let producto = new Producto()
    producto.nombre = req.body.nombre
    producto.descripcion = req.body.descripcion
    producto.precio = req.body.precio
    producto.stock = req.body.stock
    producto.imagen= req.body.imagen
    producto.bodega= req.body.bodega

    producto.save((err,productostore) => {
        if (err) res.status(500).send(`Error base de datos> ${err}`)
        res.status(200).send({producto:productostore})
    })

}

function buscar(req,res){
    Producto.find({}, (err,producto) => {
        if(!producto) return res.status(404).send({
            message:'Error producto no existe'
        })
        res.status(200).send({producto})
    })
}

function editar(req,res){
    let productoId = req.params.id
    let update = req.body
    Producto.findByIdAndUpdate(productoId, update,{
        new:true},(err, productoupdated) =>{
        if(err) return res.status(500).send({
            message: 'Error en el servidor'
        });
         
        if(productoupdated){
            return res.status(200).send({
                producto:productoupdated
            });
        }else{
            return res.status(404).send({
                message: 'No existe el producto'
            });
        }
         
    });

}

function borrar(req,res){
    let productoId = req.params.id
    Producto.findByIdAndRemove(productoId, (err, productoRemoved) => {
        if(err) return res.status(500).send({ 
            message: 'Error en el servidor'
        });
        if(productoRemoved){
            return res.status(200).send({
                producto: productoRemoved
            });
        }else{
            return res.status(404).send({
                message: 'No existe el producto'
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