'use strict'
const Bodega = require('../models/bodega.js')

/*-------------BUSCAR BODEGA-------------*/
const buscar = async (req, res) => {
    try {
        const bodega = await Bodega.find()
        .populate('usuario', ['nombre', 'role']);
        res.status(200).json(bodega);
    } catch (error) {
        res.status(404).json({ mensaje: error });
    }

}

/*-------------BUSCAR BODEGA POR ID-------------*/
const buscarPorId = async (req, res) => {
    const id = req.params.id;
    try {
        const bodega = await Bodega.findById(id)
        .populate('usuario', ['nombre', 'role']);
        if (bodega == null) 
            return res.status(404).json({ 
                mensaje: 'No existe una Bodega con ese Id.'
            })
        res.status(200).json(bodega);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
}

/*-------------GUARDAR BODEGA-------------*/
const guardar = async (req, res) => {
    const bodega = req.body;
    const newBodega = new Bodega(bodega);
    try {
        await newBodega.save();
        res.status(201).json(newBodega);
    } catch (error) {
        res.status(409).json({ mensaje: error });
    }
}

/*-------------EDITAR BODEGA-------------*/
const editar = async (req, res) => {
    const id = req.params.id;
    const bodega = req.body;
    try {
        await Bodega.findByIdAndUpdate(id, bodega);
        const bodegaActualizada = await Bodega.findById(id);
        if(bodegaActualizada == null) 
            return res.status(404).json({ 
                mensaje: 'No existe una Bodega con ese Id.' 
            })
        res.status(200).json(bodegaActualizada);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }

}

/*-------------BORRAR BODEGA-------------*/
const borrar= async (req, res) => {
    const id = req.params.id;
    try {
        const bodega = await Bodega.findById(id);
        if(bodega == null) 
            return res.status(404).json({ 
                mensaje: 'No existe una Bodega con ese Id.' 
            })
        await Bodega.findByIdAndDelete(id);
        res.status(200).json({ 
            mensaje: 'La Bodega ha sido eliminada con éxito' 
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
}

module.exports = {
    guardar,
    buscar,
    buscarPorId,
    editar,
    borrar
};