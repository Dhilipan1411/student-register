
const mongoose =require("mongoose");



const citySchema =mongoose.Schema(
    {
  
    city:{
        type:String,
        require:true,
        uppercase:true
        
    },

    }
)
const city =mongoose.model('city',citySchema)
module.exports=city;
