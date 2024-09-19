const express = require('express');
const paymentsController = require('../controller/paymentsController');

const routes = express.Router();

routes.get('/payment/status/:clientId', paymentsController.statusPagamento);
routes.get('/payment/sucesso/:clientId', paymentsController.statusPagamento);

module.exports = routes;
