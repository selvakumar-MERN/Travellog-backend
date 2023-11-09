const users= require('../model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const joi =require('@hapi/joi')
const review = require('../model/review')
const hotel = require('../model/hotel')
const user = require('../model/user')
const booking = require('../model/booking')

//Verification with joi
const emailschema= joi.object({
    email: joi.string().min(3).required().email(),
})

//email verification
const emailverification = async (req, res) => {
   try{ 
         const { error } = await emailschema.validateAsync(req.body);
          if (error) {
               res.status(400).send(error)
          }
          else{

    const emailfound = await users.findOne({ email: req.body.email })
    if (emailfound) {
        return res.status(400).send("Email already exist")
    }
    else{
          return res.status(200).send("success")
    }
}
}
catch(error){
    res.status(400).send(error)
}
}
 
//verification with joi
const usersSchema = joi.object({
    email: joi.string().min(3).required().email(),
    password: joi.string().min(8).required(),
    confirmPassword: joi.string().min(8).required(),
    confirmPassword: joi.any().equal(joi.ref('password'))
        .required()
        .label('Confirm password')
        .messages({ 'any.only': '{{#label}} does not match' })
});


//registration
const userRegistration = async (req, res) => {

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const hashedconf = await bcrypt.hash(req.body.confirmPassword, salt);

    const createUser = new users({
        email: req.body.email,
        password: hashedPass,
        confirmPassword: hashedconf
    })


    try {
        const { error } = await usersSchema.validateAsync(req.body);
        if (error) {
            res.status(400).send(error)
        }
        else {

            await createUser.save();
            return res.status(201).send("Registration successfull please Login");
        }
    }

    catch (error) {
        res.status(400).send(error)

    }
}


//user login
const Loginemailverify = async (req, res) => {
    try{
        const { error } = await emailschema.validateAsync(req.body);
        if (error) {
           return  res.status(400).send(error)
        }
    const User = await users.findOne({ email: req.body.email })
    if (!User) {
        return res.status(400).send("Invalid email")
    }
    else{
        return res.status(200).send('success')
    }
}
catch(error){
    res.status(400).send(error)
}
}
 
const userlogin = async (req, res) => {
    const User = await users.findOne({ email: req.body.email })
    const validPassword = await bcrypt.compare(req.body.password, User.password);
    if (!validPassword)
        return res.status(400).send("Invalid password");
    try {

        const token = jwt.sign({ email: User.email }, process.env.TOKEN_SECRET);
        res.header("auth_token", token).send({token:token,user:User.role});
    }

    catch (error) {
        res.status(400).send(error)
    }

}


//user login verification
const verifyLogin = async (req, res) => {
    const { token } = req.body
    try {
        const verify = jwt.verify(token, process.env.TOKEN_SECRET)
        if (verify) {
            await users.findOne({ email: verify.email })
                .then((res) =>res.toJSON()) 
                .then((data)=>{
                    
                    res.status(200).send(data)
                })

        }

    }
    catch {
        res.status(400).send('invalid token')
    }
}

const postreview= async(req,res)=>{
    const{id}=req.params;
    const create = new review({
        hotelId:id,
        user:req.body.user,
        rating:req.body.rating,
        review:req.body.review,
    })
    try{
          await create.save()
         const findrating= await review.find({hotelId:id})
         const totalrating= findrating.map(item=>item.rating)
         const final=(Math.round((totalrating.reduce((a,b)=>a+b)/totalrating.length)*10)/10).toFixed(1)
         await hotel.updateOne({_id:id},{$set:{"rating":final,"review":findrating.length}})
         res.status(200).send({messsage:"Review added sucessfully", data:findrating})
    }
    catch(error){
         res.status(400).send(error)
    }0                                                                                                                                                                                                                                                                                                        
}

const getreview= async(req,res)=>{
    const {id}= req.params;
    try{
         const find= await review.find({hotelId:id});
         res.status(200).send(find)
    }
    catch(error){
         res.status(400).send(error)
    }
}

const bookhotel=async(req,res)=>{
    const {id}=req.params
    try{
        const find= await hotel.findOne({_id:id});
        const user= await users.findOne({_id:req.body.userId})
        const createbook= new booking({
            hotelId:id,
            hotelName:find.name,
            image:find.image,
            username:user.userName,
            userId:req.body.userId,
            bookingId:req.body.bookingId,
            email:user.email,
            totalRooms:req.body.totalRooms,
            type:req.body.type,
            price:req.body.price,
            fromDate:req.body.startdate,
            toDate:req.body.enddate,
        })
        await createbook.save();
        res.status(200).send("Booking successfull")

    }
    catch(error){
         res.status(400).send(error)
    }
}

const getbook= async(req,res)=>{
    const {id}=req.params
    
    try{
        const find= await booking.find({userId:id})
        res.status(200).send(find)

    }
    catch(error){
        res.status(400).send(error)
    }
}

const addfav= async(req,res)=>{
    const {id}=req.params
    try{
         await user.updateOne({_id:id},{$push:{favorites:{"hotelId":req.body._id,"hotelName":req.body.name,"description":req.body.description,
    "image":req.body.image,"review":req.body.review,"rating":req.body.rating,"place":req.body.place}}})
        res.status(200).send("Added to favorites")
    }
    catch(error){
        res.status(400).send(error)
    }
}

const getfav= async(req,res)=>{
    const {id}=req.params
    try{
         const find= await user.findOne({_id:id})
         res.status(200).send(find.favorites)
    }
    catch(error){
        res.status(400).send(error)
    }

}
const deletefav= async(req,res)=>{
    const {id}=req.params
    try{
           const del= await user.updateOne({_id:id},{$pull:{favorites:{_id:req.body.id}}})
           res.status(200).send(del)
    }
    catch(error){
            res.status(400).send(error)
    }

}

module.exports.emailverification=emailverification;
module.exports.userRegistration=userRegistration;
module.exports.Loginemailverify=Loginemailverify;
module.exports.userlogin=userlogin;
module.exports.verifyLogin=verifyLogin;
module.exports.postreview=postreview;
module.exports.getreview=getreview;
module.exports.bookhotel=bookhotel;
module.exports.getbook=getbook;
module.exports.addfav=addfav;
module.exports.deletefav=deletefav;
module.exports.getfav=getfav;
