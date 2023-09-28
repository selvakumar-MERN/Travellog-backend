const express= require('express')
const router =express.Router();
const admindata= require('../controllers/admin')

//create hotel and room
router.post('/createhotel',admindata.createHotel)
router.post('/createroom/:id',admindata.createroom)

module.exports=router;