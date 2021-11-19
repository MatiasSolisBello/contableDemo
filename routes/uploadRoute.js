//esto parece un controller

const express = require('express');
const fileUpload = require('express-fileupload')

const app = express();

const Producto = require('../modelos/producto')

app.use( fileUpload({ useTempFiles: true }) );

app.put('/upload/:tipo/:id', function(req, res) {
    
    let tipo = req.params.tipo;
    let id = req.params.id;
    
    if(!req.files) {
         return res.status(400).send({
            message: 'No se ha seleccionado archivo'
        });
    }

    //validar tipo
    let tiposValidos = ['productos'];

    if(tiposValidos.indexOf(tipo) < 0 ){
        return res.status(400).send({
            message: 'Los tipos permitidos son '+tiposValidos.join(', ')
        });  
    }

    
    //archivo(key) en postman
    let archivo = req.files.archivo;

    let nombreArchivo = archivo.name.split('.');
    let ext = nombreArchivo[nombreArchivo.length -1];

    //validar extension
    let ext_validas = ['png', 'jpg', 'jpeg'];

    if(ext_validas.indexOf(ext) < 0 ){
        return res.status(400).send({
            message: 'Las extensiones permitidas son '+ext_validas.join(', ')
        });    
    }

    //Cambiar nombre al archivo
    let nombre = `${ id }-${ new Date().getMilliseconds() }.${ ext }`;

    archivo.mv(`uploads/${ tipo }/${ nombre }`, function(err)  {
        if (err){
            return res.status(500).send({
                message: 'Error en el servidor: ',err
            });
        }
        imagenProducto(id, res, nombre);
    })
})


function imagenProducto(id, res, nombre){
    Producto.findById(id, (err, productoDB) => {
        if(err){
            return res.status(500).send({
                err
            });
        }

        if(!productoDB){
            return res.status(400).send({
                message: 'El producto no existe'
            });
        }

        //imagen esta en modelo
        productoDB.imagen = nombre;
        //console.log(productoDB);

        productoDB.save((err, productoGuardado) => {
            if(err) return res.status(500).send({ 
                message: 'Error en el servidor',
                err
             });
            res.status(200).send({
                producto: productoGuardado
            });
        });
    });
}

module.exports = app;