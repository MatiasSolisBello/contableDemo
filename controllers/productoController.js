'use strict'
const Producto = require('../models/producto.js')
const fs = require('fs-extra');
const path = require('path')


/*-------------GUARDAR PRODUCTO-------------*/
const guardar = async (req, res) => {
    const { nombre, descripcion, precio, stock, bodega } = req.body;

    const newProducto = {
        nombre, descripcion, precio, stock, bodega,
        imagen: req.file.path
    };

    
    try {
        const product = new Producto(newProducto);
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
        const productos = await Producto.find().populate('bodega', 
            ['nombre', 'direccion']
        );

        const productosConURL = productos.map(producto => {
            const productoObj = producto.toObject();
            const imagenURL = producto.imagen
                ? `http://localhost:5000/uploads/${path.basename(producto.imagen)}`
                : null;

            return {
                ...productoObj,
                imagen: imagenURL
            };
        });

        res.status(200).json(productosConURL);
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

    console.log('---Actualizar: ', id );

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
    const { id } = req.params;

    //console.log('---Borrar: ', { id });

    try {
        const producto = await Producto.findByIdAndDelete(id)
        //console.log('---Borrar: ', producto);

        //si producto es nulo
        if (producto == null) ({
            mensaje: 'No existe un producto con ese Id.'
        })

        //si producto existe
        if (producto) {
            await fs.unlink(path.resolve(producto.imagen));
            //console.log('---Borrar: ', producto.imagen)
        }
        return res.json({ 
            message: 'Producto con id: ' + id + ' eliminado' 
        });

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