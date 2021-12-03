'use strict'
const Producto = require('../models/producto.js')

/*-------------GUARDAR PRODUCTO-------------*/
const guardar = async (req, res) => {
    const producto = req.body;
    const newProducto = new Producto(producto);
    try {
        await newProducto.save();
        res.status(201).json(newProducto);
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
        await Producto.findByIdAndUpdate(id, producto);
        const productoActualizado = await Producto.findById(id);
        if (productoActualizado == null)
            return res.status(404).json({
                mensaje: 'No existe un Producto con ese Id.'
            })
        res.status(200).json(productoActualizado);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }

}

/*-------------BORRAR PRODUCTO-------------*/
const borrar = async (req, res) => {
    const id = req.params.id;
    try {
        const producto = await Producto.findById(id);
        if (producto == null)
            return res.status(404).json({
                mensaje: 'No existe un Producto con ese Id.'
            })
        await Producto.findByIdAndDelete(id);
        res.status(200).json("El Producto ha sido eliminado con éxito");
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error en el servidor'
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