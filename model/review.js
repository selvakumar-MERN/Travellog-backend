const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
    hotelId:{
        type:String,
    },
    user:{
        type:String,
    },
    rating:{
        type:Number,
    },
    review:{
        type:String,
    }
})
module.exports = mongoose.model("reviewschema", reviewSchema);