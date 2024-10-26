// routes/paymentRoutes.js
const express = require('express');
const { paymentController } = require('../../../controllers');
const router = express.Router();
// const paymentController = require('../controllers/paymentController');

// Pay route
router.post('/pay/:billId', paymentController.initiatePayment); 

// Capture payment route
router.post('/capture', paymentController.capturePayment);


module.exports = router;