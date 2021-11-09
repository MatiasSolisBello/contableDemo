'use strict'

const express = require('express');
const AuthCtrl = require('../controllers/AuthController');
const api = express.Router();

api.post('/login',AuthCtrl.login)
api.post('/register',AuthCtrl.register)

module.exports = api;