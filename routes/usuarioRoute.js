'use strict'
var express = require('express');
var usuarioController = require('../controllers/usuarioController');
var api= express.Router();

api.post('/usuario',usuarioController.guardar)
api.get('/usuario',usuarioController.buscar)
api.put('/usuario/:id',usuarioController.editar)
api.delete('/usuario/:id',usuarioController.borrar)

module.exports = api;