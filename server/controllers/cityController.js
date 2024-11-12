const city = require("../models/city")



async function handleGetAllUsers(req,res){
    try{
        const user=await city.find({})
        
        res.status(200).json(user);
      }catch(error){
        res.status(500).json({message:error.message})
      }
}
async function handleCreateNewUser(req,res){
    try{
        const user=await city.create(req.body)
        res.status(200).json(user);
      }catch(error){
        res.status(500).json({message:error.message})
      }
}

async function handleGetUserId(req,res){
    try{
        const{id}=req.params
        const user=await city.findById(id)
        res.status(200).json(user);
      }catch(error){
        res.status(500).json({message:error.message})
      }
}
async function handleUpdateUserId(req,res){
    try{
        const{id}=req.params
        const user=await city.findByIdAndUpdate(id,req.body)
        if(!user){
          return res.status(404).json({message:"product not found"})
        }
        const updateuser =await city.findById(id)
        res.status(200).json(updateuser);
      }catch(error){
        res.status(500).json({message:error.message})
      }

}

async function handleDeleteUserId(req,res) {
    try{
        const{id}=req.params
        
        const user=await city.findByIdAndDelete(id)
        if(!user){
          return res.status(404).json({message:"product not found"})
        }
        res.status(200).json({message:"delete"});
      }catch(error){
        res.status(500).json({message:error.message})
      }
}


module.exports={handleGetAllUsers,handleCreateNewUser,handleGetUserId,handleUpdateUserId,handleDeleteUserId}