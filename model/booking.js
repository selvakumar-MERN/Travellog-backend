const mongoose = require('mongoose');
const bookingSchema= new mongoose.Schema({
    hotelId:{
        type:String,
    },
    bookingId: {
        type: String,
    },
    userId:{
        type:String,
    },
    hotelName:{
        type:String,
    },
    image:{
        type:String,
    },
    username: {
        type: String,
    },
    email: {
        type: String,
    },
    totalRooms:{
        type:String,
    },
    type: {
        type: String,
    },
    price: {
        type: String,
    },
    fromDate:{
        type:Date,
    },
    toDate:{
         type:Date,
    },
    bookedOn:{
        type:Date,
        default: new Date,
    }
})

module.exports = mongoose.model("bookingschema", bookingSchema);