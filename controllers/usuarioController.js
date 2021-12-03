'use strict'
var Usuario = require('../models/usuario')

/*-------------GUARDAR USUARIO-------------*/
const guardar = async (req, res) => {
    const usuario = req.body;
    const newUsuario = new Usuario(usuario);
    try {
        await newUsuario.save();
        res.status(201).json(newUsuario);
    } catch (error) {
        res.status(409).json({ mensaje: error });
    }
}

/*-------------BUSCAR USUARIO-------------*/
const buscar = async (req, res) => {
    try {
        const usuario = await Usuario.find({},'-clave')
        res.status(200).json(usuario);
    } catch (error) {
        res.status(404).json({ 
            mensaje: error 
        });
    }
}

/*-------------BUSCAR USUARIO POR ID-------------*/
const buscarPorId = async (req, res) => {
    const id = req.params.id;
    try {
        const usuario = await Usuario.findById(id, '-clave')
        if(usuario == null) 
        return res.status(404).json({
            mensaje: 'No existe una Usuario con ese Id.'
        })
        res.status(200).json(usuario);        
    } catch (error) {
        res.status(500).json({ 
            mensaje: 'Error en el servidor' 
        });
    }
}

/*-------------EDITAR USUARIO-------------*/
const editar= async (req, res) => {
    const id = req.params.id;
    const usuario = req.body;
    try {
        await Usuario.findByIdAndUpdate(id, usuario);
        const usuarioActualizada = await Usuario.findById(id);
        if(usuarioActualizada == null) 
            return res.status(404).json({ 
                mensaje: 'No existe una Usuario con ese Id.' 
            })
        res.status(200).json(usuarioActualizada);
    } catch (error) {
        res.status(500).json({ 
            mensaje: 'Error en el servidor' 
        });
    }

}

/*-------------ELIMINAR USUARIO-------------*/
const borrar= async (req, res) => {
    const id = req.params.id;
    try {
        const usuario = await Usuario.findById(id);
        if(usuario == null) return res.status(404).json({
            mensaje: 'No existe una Usuario con ese Id.' 
        })
        await Usuario.findByIdAndDelete(id);
        res.status(200).json({ 
            mensaje: 'La Usuario ha sido eliminada con éxito' 
        });
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