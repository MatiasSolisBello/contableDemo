'use strict'

const express = require('express');
const bodegaController = require('../controllers/bodegaController');
const {verificaToken, verificaBodega} = require('../middlewares/autenticacion');
const api= express.Router();

api.post(
    '/bodega',
    [verificaToken],
    bodegaController.guardar
)

api.get(
    '/bodega',
    [verificaToken, verificaBodega],
    bodegaController.buscar
)

api.put(
    '/bodega/:id',
    [verificaToken],
    bodegaController.editar
)

api.delete(
    '/bodega/:id',
    [verificaToken],
    bodegaController.borrar
)

module.exports = api;