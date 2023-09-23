const mongoose = require("mongoose");
const reviewschema = new mongoose.Schema({
    Rating:{
        type:Number,
        min:0,
        max:5
    },
    Comment:{
        type:String,
        trime:true
    }

})

const Reviews = mongoose.model("Reviews", reviewschema);
module.exports =Reviews;
