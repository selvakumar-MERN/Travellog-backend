const hotel= require('../model/hotel')

const createHotel = async(req,res)=>{
    const create = new hotel({
        name:req.body.name,
        place:req.body.place,
        image:req.body.image,
        description:req.body.description,
        aminities:req.body.aminities
    })
    try{
        await create.save();
        res.status(200).send("Hotel created successfully")
    }
    catch(error){
        res.status(400).send(error)
    }
}

const createroom= async(req,res)=>{
    const{id}=req.params
    const {roomId,type,price}=req.body
    try{
        await hotel.updateOne({"_id":id},{$push:{"room":{"roomId":roomId,"type":type,"price":price}}})
        res.status(200).send('Room created sucessfully')

    }
    catch(error){
        res.status(400).send(error)
    }
}

module.exports.createroom=createroom; 
module.exports.createHotel= createHotel;