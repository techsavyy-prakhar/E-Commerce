require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const path = require("path");
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const Product = require('./models/Product');
const methodOverride = require("method-override");
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');



const User = require('./models/user');


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));



app.engine('ejs', ejsMate); 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));




const db_url =
  process.env.DB_URL || "mongodb://127.0.0.1:27017/e-Commerce";
mongoose
  .connect(db_url,{
  })
  .then(() => {
    console.log("e-Commerce Database is Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(session({
    secret: 'weneedbettersecret',
    resave: false,
    saveUninitialized: true,
}))


app.use(flash());


app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next)=>{
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.get('/',(req,res)=>{
    res.render('home')
})

//-------------------------------------------------------->
//-------------------product routes ---------------------->
//--------------------------------------------------------->


const productRoutes = require('./routes/product');
const reviewRoutes = require('./routes/reviews');
const authRoutes = require('./routes/auth');




//APIs -------------------------------------------
const productAPI = require('./routes/api/wishlistapi');
const paymentAPI = require('./routes/api/paymentApi/payment');
const cartAPI = require('./routes/api/cartapi');



app.use(productRoutes);
app.use(reviewRoutes);
app.use(authRoutes);
app.use(productAPI);
app.use(cartAPI);
app.use(paymentAPI);




app.listen(port, () => {
    console.log("The Server is up at the ", port);
});