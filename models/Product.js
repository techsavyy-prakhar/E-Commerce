const mongoose = require("mongoose");
const Reviews = require('./Reviews');
const User = require('./user');
const ProductsSchema = new mongoose.Schema({
  Name: {
    type: String,
    trim: true,
    required: true,
  },
  Image: {
    type: String,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
    min: 0,
  },
  Description: {
    type: String,
    trim: true,
    required: true,
  },
  Reviews:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Reviews'
    }
  ],
  author:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'

  }
});
const Product = mongoose.model("Product", ProductsSchema);

module.exports = Product;
