'use strict'

const express = require('express');

const productoController = require('../controllers/productoController');
const {verificaToken, verificaPersonal} = require('../middlewares/autenticacion');
const upload = require('../libs/multer');

const api= express.Router();

//Rutas
api.post(
    '/producto', 
    [verificaToken, verificaPersonal],
    upload.single('imagen'),
    productoController.guardar
)

api.get(
    '/producto',
    productoController.buscar
)

api.get(
    '/producto/:id',
    productoController.buscarPorId
)

api.put(
    '/producto/:id',
    [verificaToken, verificaPersonal],
    upload.single('imagen'),
    productoController.editar
)

api.delete(
    '/producto/:id',
    [verificaToken, verificaPersonal],
    productoController.borrar
)

module.exports = api;