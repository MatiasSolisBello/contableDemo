'use strict'

var express = require('express');
var productoController = require('../controllers/productoController');
const {verificaToken, verificaPersonal} = require('../middlewares/autenticacion');
var api= express.Router();

//Rutas
api.post(
    '/producto', 
    [verificaToken, verificaPersonal],
    productoController.guardar
)

api.get(
    '/producto',
    productoController.buscar
)

api.get(
    '/producto/:id',
    productoController.buscar
)

api.put(
    '/producto/:id',
    [verificaToken, verificaPersonal],
    productoController.editar
)

api.delete(
    '/producto/:id',
    [verificaToken, verificaPersonal],
    productoController.borrar
)

module.exports = api;