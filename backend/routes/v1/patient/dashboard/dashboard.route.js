// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const dashboardPatientController = require('../../../../controllers/patient/dashboard/patient.dashboard.controller');

// Pay route
// router.post('/pay/:billId', dashboardPatientController); 

// Capture payment route
// router.post('/capture', dashboardPatientController);


module.exports = router;