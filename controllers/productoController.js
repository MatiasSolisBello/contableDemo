'use strict'
const Producto = require('../models/producto.js')
const fs = require('fs-extra');
const path = require('path')


/*-------------GUARDAR PRODUCTO-------------*/
const guardar = async (req, res) => {
    const { nombre, descripcion, precio, stock, bodega } = req.body;
    const imagen = req.file ? req.file.filename : null;

    const newProducto = {
        nombre, descripcion, precio, stock, bodega, imagen
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
    const { id } = req.params;

    try {
        const productoExistente = await Producto.findById(id);
        if (!productoExistente) {
            return res.status(404).json({
                mensaje: 'No existe un Producto con ese Id.'
            });
        }

        // Si viene una nueva imagen
        if (req.file) {
            // Eliminar la imagen anterior
            if (productoExistente.imagen) {
                const rutaAnterior = path.resolve(__dirname, '../uploads', productoExistente.imagen);
                try {
                    await fs.unlink(rutaAnterior);
                } catch (err) {
                    console.warn('No se pudo borrar la imagen anterior:', err.message);
                }
            }

            // Reemplazar el nombre de la imagen en los datos actualizados
            req.body.imagen = req.file.filename;
        }

        const productoActualizado = await Producto.findByIdAndUpdate(id, req.body, {
            new: true, // para que retorne el objeto actualizado
            runValidators: true // por si tienes validaciones en el esquema
        });

        res.status(200).json({
            message: 'Producto actualizado',
            productoActualizado
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};

/*-------------BORRAR PRODUCTO-------------*/
const borrar = async (req, res) => {
    const { id } = req.params;
    try {
        const producto = await Producto.findByIdAndDelete(id);
        if (producto == null) {
            return res.status(404).json({
                mensaje: 'No existe un producto con ese Id.'
            });
        }

        if (producto.imagen) {
            try {
                await fs.unlink(
                    path.resolve(__dirname, '../uploads', producto.imagen)
                );
            } catch (err) {
                console.warn('No se pudo borrar la imagen:', err.message);
            }
        }

        return res.json({ 
            message: 'Producto con id: ' + id + ' eliminado' 
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error en el servidor',
            error: error.message
        });
    }
};
module.exports = {
    guardar,
    buscar,
    buscarPorId,
    editar,
    borrar
};