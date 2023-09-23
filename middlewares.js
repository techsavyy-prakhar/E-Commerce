const { productSchema } = require('./joischema');
const Product = require('./models/Product');
const user = require('./models/user');


module.exports.validateProduct = async (req, res, next) => {
    try {
        const { Name, Image, Price, Description } = req.body;
        const { error } = await productSchema.validate({ Name, Image, Price, Description });

        if (error) {
            const msg = error.message;
            res.render('error', { err: msg })
        }

        next(); 
    } 
    catch (error) {
        res.render('error', {err:error.message});
    }
    
}

module.exports.checkAuthentication = async (req,res,next) => {
    try {
        if(req.xhr && !req.isAuthenticated()){
            return res.status(401).json({
                msg:'Login First'
            })
        }
        if(req.isAuthenticated()){
            next();
        } else{
            
    
            res.redirect('/login');
        }  
    } catch (error) {
        res.render('error', {err:error.message});
    }
    
}

module.exports.isSeller = async (req,res,next) =>{
    try {
        if(req.user && req.user.role === 'buyer'){
            req.flash('error','You are not Authorised to do that!');
            return res.redirect('back');
        }
        next();
    } catch (error) {
        
        res.render('error', {err:error.message});

    }
    
}
module.exports.isAuthor  = async (req,res,next)=>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id).populate('author');
        if(product.author._id.toString()!==req.user._id.toString()){
            req.flash('error','You are not authorised to do that');
            return res.redirect('back');
        }
        next();
    } 
    catch (error) {
        res.render('error', {err:error.message});
    }
    
}