'use strict'
const Producto = require('../models/producto.js')
const fs = require('fs-extra');
const path = require('path')


/*-------------GUARDAR PRODUCTO-------------*/
const guardar = async (req, res) => {
    const producto = req.body;
    const newProducto = { producto, imagen: req.file.path };
    const product = new Producto(newProducto);
    try {
        await product.save();
        res.status(201).json({
            message: 'Producto guardado',
            newProducto
        });
    } catch (error) {
        res.status(409).json({ mensaje: error });
    }

}

/*-------------BUSCAR PRODUCTO-------------*/
const buscar = async (req, res) => {
    try {
        const producto = await Producto.find()
        .populate('bodega', ['nombre', 'direccion']);
        res.status(200).json(producto);
    } catch (error) {
        res.status(404).json({ mensaje: error });
    }
}

/*-------------BUSCAR PRODUCTO POR ID-------------*/
const buscarPorId = async (req, res) => {
    const id = req.params.id;
    try {
        const producto = await Producto.findById(id)
        .populate('bodega', ['nombre', 'direccion']);
        if (producto == null)
            return res.status(404).json({
                mensaje: 'No existe un Producto con ese Id.'
            })
        res.status(200).json(producto);
    } catch (error) {
        res.status(404).json({ mensaje: error });
    }

}

/*-------------EDITAR PRODUCTO-------------*/
const editar = async (req, res) => {
    const id = req.params.id;
    const producto = req.body;
    try {
        const productoActualizado = await Producto.findByIdAndUpdate(id, producto);
        if (productoActualizado == null)
            return res.status(404).json({
                mensaje: 'No existe un Producto con ese Id.'
            })
        res.status(200).json({
            message: 'Producto actualizado',
            productoActualizado
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }

}

/*-------------BORRAR PRODUCTO-------------*/
const borrar = async (req, res) => {

    //obtenemos el id
    const id = req.params.id;

    try {
        const producto = await Producto.fifindByIdAndRemovendById(id);
        if (producto == null){
            return res.status(404).json({
                mensaje: 'No existe un Producto con ese Id.'
            })
        }
        
        await fs.unlink(path.resolve(photo.imagen));
        res.status(200).json("El producto ha sido eliminado con éxito");
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error en el servidor',
            error
        });
    }
}

module.exports = {
    guardar,
    buscar,
    buscarPorId,
    editar,
    borrar
};