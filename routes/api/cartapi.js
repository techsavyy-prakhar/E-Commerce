const express = require('express');
const router = express.Router();
const { checkAuthentication } = require('../../middlewares');
const User = require('../../models/user');
const Product = require('../../models/Product');

router.post('/user/:productId/cart/add', checkAuthentication, async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId);
        const userId = req.user._id;
        const user = await User.findById(userId);
        let ind = -1;
        const item = user.cart.find((item, index)=>{
            if(item.productId.equals(product._id)){
                ind = index;
                return item;
            }
        });
        if(item){
            user.cart[ind].quantity++;
        }else{
            user.cart.push({productId:product._id});
        }
        await user.save();
        res.status(200).json({
            success: true
        })
    } catch (error) {
        res.render('error', {err:error.message});
    }
})

router.post('/user/:productId/cart/remove', checkAuthentication, async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId);

        const userId = req.user._id;
        const user = await User.findById(userId);

        let ind = -1;
        const item = user.cart.find((item, index) => {
            if (item.productId.equals(product._id)) {
                ind = index;
                return item;
            }
        });

        if (item) {
            user.cart[ind].quantity--; //item.quantity--
            if (user.cart[ind].quantity === 0) {
                // Remove the item from the cart if the quantity reaches 0
                user.cart.splice(ind, 1); // Use splice to remove the item from the array
            }
        } else {
            console.log('Error');
        }
        
        await user.save();
        req.flash('success', 'Item removed from cart'); // Adjust the flash message to indicate item removal
        res.redirect('back');
    } catch (error) {
        res.render('error', {err:error.message});
    }
});

router.post('/user/:productId/cart/removepermanently', checkAuthentication, async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId);
        const userId = req.user._id;
        const user = await User.findById(userId);
        let ind = -1;
        const item = user.cart.find((item, index) => {
            if (item.productId.equals(product._id)) {
                ind = index;
                return item;
            }
        });
        user.cart.splice(ind, 1); // Use splice to remove the item from the array
        await user.save();
        req.flash('success', 'Item removed from cart'); // Adjust the flash message to indicate item removal
        res.redirect('back');
    } catch (error) {
        res.render('error', {err:error.message});
    }
});







router.get('/user/cart', checkAuthentication, async (req, res) => {
    const userId = req.user._id;
    const user = await User.findById(userId).populate('cart.productId');

    res.render('cart/index', { cart: user.cart });
})


module.exports = router;