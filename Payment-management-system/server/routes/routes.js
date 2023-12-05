const express = require('express');
const service = require('../controllers/controllers');
const router = express.Router();

//operations on payments
router.get('/api/payments', service.findAllPayments);//working
router.get('/api/payments/:id', service.findPaymentsByCustomerId);//working
router.delete('/api/payments/:id', service.deletePaymentById);//working
router.put('/api/payments/:id', service.updatePaymentById);//working
router.post('/api/payments', service.createPayment);//working


//operations on custoomers
router.get('/api/customers', service.findAllUsers);//working
router.get('/api/customers/:id', service.findUserById);//working
router.delete('/api/customers/:id', service.deleteUserById);//working
router.put('/api/customers/:id', service.updateUserById);//working
router.post('/api/customers', service.createUser);//working

module.exports = { router };