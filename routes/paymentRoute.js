'use strict'
const paymentController = require('../controllers/paymentController');
const express = require('express');
const api= express.Router();

api.post(
    '/create-order/:id',
    paymentController.createOrder
);

api.get(
    '/capture-order', 
    paymentController.captureOrder
);


api.get(
    '/cancel-order', 
    paymentController.cancelPayment
);

module.exports = api;