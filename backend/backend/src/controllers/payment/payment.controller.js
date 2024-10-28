// controllers/paymentController.js
const paypal = require('@paypal/checkout-server-sdk');
const Bill = require('../../models/bill.model');
const dotenv = require('dotenv');
dotenv.config();

// PayPal environment setup
const environment = new paypal.core.SandboxEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET);
const client = new paypal.core.PayPalHttpClient(environment);

// Initiate PayPal payment
exports.initiatePayment = async (req, res) => {
    const { billId } = req.body; // Bill ID from the URL parameter
    try {
        // Fetch the bill to get the total payable amount
        const bill = await Bill.findById(billId);
        if (!bill) {
            return res.status(404).json({ error: 'Bill not found' });
        }

        // Check if totalPrice exists in the bill document
        const totalAmount = bill.TotalAmount;
        if (totalAmount === undefined || totalAmount === null) {
            return res.status(400).json({ error: 'Total amount is not available in the bill' });
        }

        // Create the order for PayPal
        const request = new paypal.orders.OrdersCreateRequest();
        request.prefer("return=representation");
        request.requestBody({
            intent: "CAPTURE",
            purchase_units: [{
                amount: {
                    currency_code: "USD",
                    value: totalAmount.toString()
                }
            }],
            application_context: {
                brand_name: "Your App Name",
                landing_page: "BILLING",
                user_action: "PAY_NOW",
                return_url: `${process.env.PAYPAL_RETURN_URL}`,
                cancel_url: `${process.env.PAYPAL_CANCEL_URL}`
            }
        });

        // Execute the payment creation
        const order = await client.execute(request);

        res.status(200).json({
            success: true,
            orderId: order.result.id,
            approvalUrl: order.result.links.find(link => link.rel === 'approve').href
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Payment initiation failed', message: error.message });
    }
};


// Capture PayPal payment

// Capture PayPal payment
// Capture PayPal payment
exports.capturePayment = async (req, res) => {
    const { orderId, billId } = req.body;
    try {
        const request = new paypal.orders.OrdersCaptureRequest(orderId);
        request.requestBody({});

        const capture = await client.execute(request);
        console.log('Capture Response:', capture); // Log the entire capture response

        // Check if payment was successful
        if (capture.result.status !== 'COMPLETED') {
            return res.status(400).json({
                error: 'Payment capture failed',
                message: 'Order has not been approved by the payer. Please approve the payment and try again.'
            });
        }

        // Update the bill status to 'paid'
        const bill = await Bill.findByIdAndUpdate(billId, { status: 'paid' }, { new: true });

        if (!bill) {
            return res.status(404).json({ error: 'Bill not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Payment successful',
            captureId: capture.result.id,
            bill // Return the updated bill information
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Payment capture failed',
            message: error.message
        });
    }
};



// exports.capturePayment = async (req, res) => {
//     const { orderId, billId } = req.body;
//     try {
//         const request = new paypal.orders.OrdersCaptureRequest(orderId);
//         request.requestBody({});

//         const capture = await client.execute(request);

//         // Update the bill status to 'paid'
//         const bill = await Bill.findByIdAndUpdate(billId, { status: 'paid' }, { new: true });

//         if (!bill) {
//             return res.status(404).json({ error: 'Bill not found' });
//         }

//         res.status(200).json({
//             success: true,
//             message: 'Payment successful',
//             captureId: capture.result.id,
//             status: capture.result.status,
//             bill
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Payment capture failed', message: error.message });
//     }
// };