// models/Payment.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    prescriptionId: { type: mongoose.Schema.Types.ObjectId, ref: 'prescription', required: true },
    captureId: { type: String, required: true }, // PayPal Capture ID
    amount: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    status: { type: String, required: true }, // e.g., 'COMPLETED', 'FAILED'
    paymentDate: { type: Date, default: Date.now },
},{ timestamps: true });

const Payment = mongoose.model('payment', paymentSchema);

module.exports = Payment;