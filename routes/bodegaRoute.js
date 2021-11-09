'use strict'

const express = require('express');
const bodegaController = require('../controllers/bodegaController');
const auth = require('../middlewares/autenticacion');
const api= express.Router();

api.post(
    '/bodega',
    [auth.verificaToken],
    bodegaController.guardar
)

api.get(
    '/bodega',
    [auth.verificaToken],
    bodegaController.buscar
)

api.put(
    '/bodega/:id',
    [auth.verificaToken],
    bodegaController.editar
)

api.delete(
    '/bodega/:id',
    [auth.verificaToken],
    bodegaController.borrar
)

module.exports = api;