const express = require('express');
const Product = require('../models/Product');
const Reviews = require('../models/Reviews');
const {checkAuthentication}  = require('../middlewares');
const router = express.Router(); 

router.post('/products/:productId/review', checkAuthentication, async (req, res)=>{
    const {productId} = req.params;
    const {Rating, Comment} = req.body;
    console.log('Review Added!');
    const newReview = await Reviews.create({Rating, Comment});
    const product = await Product.findById(productId);
    product.Reviews.push(newReview);
    product.save();
    res.redirect('back')
});

module.exports = router;