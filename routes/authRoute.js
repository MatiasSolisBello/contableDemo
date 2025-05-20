'use strict'

const express = require('express');
const AuthCtrl = require('../controllers/authController');
const {verificaToken} = require('../middlewares/autenticacion');
const { loginLimiter } = require('../middlewares/limiter');
const api = express.Router();

api.post(
    '/login',
    loginLimiter, AuthCtrl.login
)

api.post(
    '/register',
    AuthCtrl.register
)

api.post(
    '/logout',
    verificaToken,
    AuthCtrl.logout
)

module.exports = api;