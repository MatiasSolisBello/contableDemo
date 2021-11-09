'use strict'

//Cargamos modulo express para crear nuevas rutas
var express = require('express');

var rolController = require('../controllers/rolController');

var api = express.Router();

//guardamos
api.post('/rol',rolController.guardar)
api.get('/rol',rolController.buscar)
api.put('/rol/:id',rolController.editar)
api.delete('/rol/:id',rolController.borrar)

//exportamos configuracion
module.exports = api;