'use strict'

const express = require('express');
const bodegaController = require('../controllers/bodegaController');
const {verificaToken, verificaPersonal} = require('../middlewares/autenticacion');
const api= express.Router();

api.post(
    '/bodega',
    [verificaToken, verificaPersonal],
    bodegaController.guardar
)

api.get(
    '/bodega',
    [verificaToken, verificaPersonal],
    bodegaController.buscar
)

api.put(
    '/bodega/:id',
    [verificaToken, verificaPersonal],
    bodegaController.editar
)

api.delete(
    '/bodega/:id',
    [verificaToken, verificaPersonal],
    bodegaController.borrar
)

module.exports = api;