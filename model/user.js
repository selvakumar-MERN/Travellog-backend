const mongoose= require("mongoose");
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        min:3,
    },
    userName:{
        type:String,
    },
    password:{
        type:String,
        min:6,
    },
   
    confirmPassword:{
        type:String,
        min:6,
    },
    googleId:{
        type:String,
    },
    role:{
        type:String,
        default:'user',
    },
    favorites: [{
        hotelId: {
            type: String,
        },
        hotelName: {
            type: String,
        },
        description: {
            type: String,
        },
        image:{
            type:String,
        },
        review: {
            type: Number,
        },
        rating: {
            type: Number,
        },
        place:{
            type:String,
        },
    }]
})
module.exports= mongoose.model("userschema",userSchema);