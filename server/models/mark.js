
const mongoose =require("mongoose");



const depSchema =mongoose.Schema(
    {
  
    dep:{
        type:String,
        require:true,
        uppercase:true
        
    },

    }
)
const dep =mongoose.model('dep',depSchema)
module.exports=dep;

