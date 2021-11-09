'use strict'
var express = require('express');
var usuarioController = require('../controllers/usuarioController');
const auth = require('../middlewares/autenticacion');
var api= express.Router();

api.post(
    '/usuario',
    [auth.verificaToken],
    usuarioController.guardar
)

api.get(
    '/usuario', 
    [auth.verificaToken, auth.verificaAdmin], 
    usuarioController.buscar
)

api.put(
    '/usuario/:id',
    [auth.verificaToken],
    usuarioController.editar
)

api.delete(
    '/usuario/:id',
    [auth.verificaToken],
    usuarioController.borrar
)

module.exports = api;