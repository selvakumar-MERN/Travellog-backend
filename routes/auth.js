const express= require('express')
const router =express.Router();
const auth= require('../controllers/auth')


router.post('/googletoken',auth.googleAuth)


module.exports=router;