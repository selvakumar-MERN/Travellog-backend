const hotel= require('../model/hotel')

const gethotel= async(req,res)=>{
    const{place}=req.params
    try{
         const find= await hotel.find({"place":place})
         res.status(200).send(find)
    
    }
    catch(error){
        res.status(400).send(error)
    }
}

const getone= async(req,res)=>{
    const{id}=req.params
    try{
         const find= await hotel.find({"_id":id})
         res.status(200).send(...find)
    
    }
    catch(error){
        res.status(400).send(error)
    }
}

module.exports.getone=getone;
module.exports.gethotel=gethotel;