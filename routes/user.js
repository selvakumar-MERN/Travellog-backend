const express= require('express')
const router =express.Router();
const userdata= require('../controllers/user')
const hoteldata= require('../controllers/Hotel')
const payment = require('../controllers/payment')
const forgotpassword= require('../controllers/forgotpassword')


// user register,login,forgot password.
router.post('/emailverify',userdata.emailverification)
router.post('/register',userdata.userRegistration)
router.post('/loginemail',userdata.Loginemailverify)
router.post('/login',userdata.userlogin)
router.post('/verifylogin',userdata.verifyLogin)
router.post('/passwordreset',forgotpassword.emailverify)
router.post('/passwordreset/:token',forgotpassword.verifytoken)
router.post('/resetpassword/:token',forgotpassword.resetpassword)

//hotel list
router.get('/gethotel/:place',hoteldata.gethotel)
router.get('/getone/:id',hoteldata.getone)
router.post('/getdate/:id',hoteldata.getdate)
router.get('/gethotel',hoteldata.gethotels)
router.post('/postreview/:id',userdata.postreview)
router.get('/getreview/:id',userdata.getreview)
router.post('/bookhotel/:id',userdata.bookhotel)
router.get('/getbook/:id',userdata.getbook)
router.post('/addfav/:id',userdata.addfav)
router.post('/deletefav/:id',userdata.deletefav)
router.get('/getfav/:id',userdata.getfav)

//payment
router.post('/order',payment.orderpayment)
router.post('/orderverify',payment.verifyorder)


module.exports= router
