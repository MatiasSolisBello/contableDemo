'use strict'

//Cargamos modulo express para crear nuevas rutas
var express = require('express');

//cargamos el controlador
var bodegaController = require('../controllers/bodegaController');

//llamamos al router
var api= express.Router();

//guardamos empresa
api.post('/bodega',bodegaController.guardar)
api.get('/bodega',bodegaController.buscar)
api.put('/bodega/:id',bodegaController.editar)
api.delete('/bodega/:id',bodegaController.borrar)
//exportamos configuracion
module.exports = api;