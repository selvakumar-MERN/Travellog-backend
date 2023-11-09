const booking = require('../model/booking')
const hotel = require('../model/hotel')





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

const getdate= async(req,res)=>{
    const {id}= req.params
    const {startdate,enddate}=req.body
    
    const fromdate= new Date(startdate)
    const todate= new Date(enddate)
    const difftime= Math.abs(todate-fromdate)
    const diffdate= Math.ceil(difftime/(1000*60*60*24))
      
    try{
         
         const find= await booking.find({hotelId:id})
         const filter= find.filter((item)=> {
                   return item.fromDate > fromdate && item.toDate < todate })
                  
        const fil= filter.map((item)=>{
            return item.roomId 
        })
          
       const hotelfind= await hotel.findOne({_id:id})
      
            const final= hotelfind.room.filter(item=> !fil.includes(item.roomId))
       res.status(200).send({"data":final,"days":diffdate})
    }
    catch(error){
       res.status(400).send(error)
    }
}



const gethotels= async(req,res)=>{
    
    try{
         const find= await hotel.find()
         res.status(200).send(find)
    
    }
    catch(error){
        res.status(400).send(error)
    }
}


module.exports.getdate=getdate;
module.exports.getone=getone;
module.exports.gethotel=gethotel;
module.exports.gethotels=gethotels;