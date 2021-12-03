'use strict'
const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const {verificaToken, verificaAdmin} = require('../middlewares/autenticacion');
const api= express.Router();

api.post(
    '/usuario',
    [verificaToken, verificaAdmin],
    usuarioController.guardar
)

api.get(
    '/usuario', 
    [verificaToken, verificaAdmin], 
    usuarioController.buscar
)

api.get(
    '/usuario/:id', 
    [verificaToken, verificaAdmin], 
    usuarioController.buscarPorId
)

api.put(
    '/usuario/:id',
    [verificaToken, verificaAdmin],
    usuarioController.editar
)

api.delete(
    '/usuario/:id',
    [verificaToken, verificaAdmin],
    usuarioController.borrar
)

module.exports = api;