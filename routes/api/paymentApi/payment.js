const express = require('express');
const router = express.Router();
const Order = require('../../../models/order');
const Razorpay = require('razorpay');
const { validatePaymentVerification } = require('razorpay/dist/utils/razorpay-utils');
const {checkAuthentication} = require('../../../middlewares');
router.post('/order', checkAuthentication,async (req, res) => {
    try {
        const instance = new Razorpay({ key_id: 'rzp_test_CKhdNh4a0I4LDl',key_secret: 'skk3xP4SIioo7Qehhni4tZyx'})
        const {amount} = req.body;
        const options = {
            amount: parseInt(amount) * 100,
            currency: "INR",
        };
        const order = await instance.orders.create(options);
        await Order.create({
            _id:order.id,
            user:req.user,
            amount:amount
        })

        res.json({
            sucess:true,
            order
        })
    } catch (error) {
        console.log(error);
        
    }
    
});

router.post('/payment-verify', async (req, res)=>{
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    
    const isValid = validatePaymentVerification({"order_id": razorpay_order_id, "payment_id": razorpay_payment_id }, razorpay_signature, 'skk3xP4SIioo7Qehhni4tZyx');

    if (isValid) {
        await Order.findByIdAndUpdate({ _id: razorpay_order_id }, { paymentStatus: true });
        return res.render('payment/paymentsuccess.ejs'); // Render the view
    }
    
    return res.status(200).json({
        success: false,
        msg: 'Payment unsuccessful'
    });
})


module.exports = router;