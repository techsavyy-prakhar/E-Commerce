const express = require('express');
const router = express.Router(); 
const Product = require('../models/Product');
const {validateProduct} = require('../middlewares');
const {checkAuthentication} = require('../middlewares');
const {isSeller, isAuthor} = require('../middlewares');


router.get('/products',async (req,res)=>{
    try{
        const products = await Product.find({}).populate('Reviews');
        res.render('Products/index',{products});
    }
    catch(e){
        res.render('error', {err:e.message});
    }
    
    
})

router.get('/products/new',checkAuthentication, isSeller,(req,res)=>{
    res.render('Products/new');
})

router.post('/products', checkAuthentication, isSeller, validateProduct, async (req,res)=>{
    try{
        const {Name,Image,Price,Description} = req.body;
        await Product.create({Name,Image,Price,Description, author:req.user._id});

        req.flash('success', 'Successfully added your product!');
        res.redirect('/products');

    }
    catch(e){
        res.render('error', {err:e.message});
    }
    
})


router.get('/products/:id',async (req,res)=>{
    const {id} = req.params;
    const products = await Product.findById(id).populate('Reviews');
    res.render('Products/show',{products});
})

router.get('/products/:id/edit', checkAuthentication, isSeller, isAuthor, async (req,res)=>{
    const {id} = req.params;
    const products = await Product.find({_id:id});
    res.render('Products/edit',{products});
})

router.patch('/products/:id', checkAuthentication, isSeller, isAuthor,  validateProduct,  async (req,res)=>{
    try{
        const {id} = req.params;
        const {Name,Image,Price,Description} = req.body;
        await Product.findByIdAndUpdate(id,{
            Name:Name,
            Image:Image,
            Price:Price,
            Description:Description
        } )
        req.flash('success', 'Changes saved!');
        res.redirect(`/products/${id}`)
    }
    catch(e){
        res.render('error', {err:e.message});
    }
    
})


router.delete('/products/:id', checkAuthentication, isSeller, isAuthor, checkAuthentication, async (req,res)=>{
    const {id} = req.params;
    await Product.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted your product!');
    res.redirect('/products')
})

module.exports = router;