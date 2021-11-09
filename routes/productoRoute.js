'use strict'

var express = require('express');
var productoController = require('../controllers/productoController');
var api= express.Router();

//Rutas
api.post('/producto', productoController.guardar)
api.get('/producto',productoController.buscar)
api.put('/producto/:id',productoController.editar)
api.delete('/producto/:id',productoController.borrar)

//exportamos configuracion
module.exports = api;