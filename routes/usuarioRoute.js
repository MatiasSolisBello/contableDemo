'use strict'
var express = require('express');
var usuarioController = require('../controllers/usuarioController');
const {verificaToken, verificaAdmin} = require('../middlewares/autenticacion');
var api= express.Router();

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