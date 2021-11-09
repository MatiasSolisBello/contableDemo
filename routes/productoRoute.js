'use strict'

var express = require('express');
var productoController = require('../controllers/productoController');
const auth = require('../middlewares/autenticacion');
var api= express.Router();

//Rutas
api.post(
    '/producto', 
    [auth.verificaToken],
    productoController.guardar
)

api.get(
    '/producto',
    [auth.verificaToken],
    productoController.buscar
)

api.put(
    '/producto/:id',
    [auth.verificaToken],
    productoController.editar
)

api.delete(
    '/producto/:id',
    [auth.verificaToken],
    productoController.borrar
)

module.exports = api;