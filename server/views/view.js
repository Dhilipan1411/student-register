const mongoose=require("mongoose")

 async function connectMongoDb(url){
    return mongoose.connect(url)
.then(()=>{
  console.log("conect")
})
.catch(()=>{
  console.log("failed")
})}

module.exports={connectMongoDb}



































// const mongoose = require("mongoose");

// const crudSchema = mongoose.Schema({
//     RollNo: {
//       type: Number,
//       required: [true, "please enter Roll Number"]
//     },
//     name: {
//       type: String,
//       required: [true, "please enter name"],
//       uppercase: true,
//     },
//     city: {
//       type: mongoose.SchemaTypes.ObjectId,
//       ref: "city"
//     },
//     age: {
//       type: Number,
//       required: true,
//     },
//     department: {
//       type: mongoose.SchemaTypes.ObjectId,
//       uppercase:(true),
//       ref: "department",
//     },
//     subjects: [
//       {
//         name: { type: String, required: true ,uppercase:(true)},
//         mark: { type: Number, required: true }
//       }
//     ],
//     mark: {
//       type: String,
//       required: true,
//       uppercase: true,
//     },
//   });
  
//   const users = mongoose.model("users", crudSchema);
//   module.exports = users;
//       iethu users model,   const mongoose = require("mongoose");

// const departmentSchema = new mongoose.Schema({
 
//      department:String,
//      subjects: [String],
// });

// const department = mongoose.model("department", departmentSchema);

// module.exports = department;   iethu department model,  





// const users = require("../models/user.js")

// async function handleGetAllUsers(req,res){
//     try{
//         const user=await users.find({}).populate([{path : 'department'  }]).populate([{path : 'city'  }])
        
//         res.status(200).json(user);
//       }catch(error){
//         res.status(500).json({message:error.message})
//       }
// }
// async function handleCreateNewUser(req,res){
//     try{
//         const user=await users.create(req.body)
//         res.status(200).json(user);
//       }catch(error){
//         res.status(500).json({message:error.message})
//       }
// }

// async function handleGetUserId(req,res){
//     try{
//         const{id}=req.params
//         const user=await users.findById(id)
//         res.status(200).json(user);
//       }catch(error){
//         res.status(500).json({message:error.message})
//       }
// }
// async function handleUpdateUserId(req,res){
//     try{
//         const{id}=req.params
//         const user=await users.findByIdAndUpdate(id,req.body)
//         if(!user){
//           return res.status(404).json({message:"product not found"})
//         }
//         const updateuser =await users.findById(id)
//         res.status(200).json(updateuser);
//       }catch(error){
//         res.status(500).json({message:error.message})
//       }

// }

// async function handleDeleteUserId(req,res) {
//     try{
//         const{id}=req.params
        
//         const user=await users.findByIdAndDelete(id)
//         if(!user){
//           return res.status(404).json({message:"product not found"})
//         }
//         res.status(200).json({message:"delete"});
//       }catch(error){
//         res.status(500).json({message:error.message})
//       }
// }


// module.exports={handleGetAllUsers,handleCreateNewUser,handleGetUserId,handleUpdateUserId,handleDeleteUserId}  iethu users controller   const department = require("../models/sub")



// async function handleGetAllUsers(req,res){
//     try{
//         const user=await department.find({})
        
//         res.status(200).json(user);
//       }catch(error){
//         res.status(500).json({message:error.message})
//       }
// }
// async function handleCreateNewUser(req,res){
//     try{
//         const user=await department.create(req.body)
//         res.status(200).json(user);
//       }catch(error){
//         res.status(500).json({message:error.message})
//       }
// }


// async function handleGetUserId(req,res){
//     try{
//         const{id}=req.params
//         const user=await department.findById(id)
//         res.status(200).json(user);
//       }catch(error){
//         res.status(500).json({message:error.message})
//       }
// }
// async function handleUpdateUserId(req,res){
//     try{
//         const{id}=req.params
//         const user=await department.findByIdAndUpdate(id,req.body)
//         if(!user){
//           return res.status(404).json({message:"product not found"})
//         }
//         const updateuser =await department.findById(id)
//         res.status(200).json(updateuser);
//       }catch(error){
//         res.status(500).json({message:error.message})
//       }

// }

// async function handleDeleteUserId(req,res) {
//     try{
//         const{id}=req.params
        
//         const user=await department.findByIdAndDelete(id)
//         if(!user){
//           return res.status(404).json({message:"product not found"})
//         }
//         res.status(200).json({message:"delete"});
//       }catch(error){
//         res.status(500).json({message:error.message})
//       }
// }


// module.exports={handleGetAllUsers,handleCreateNewUser,handleGetUserId,handleUpdateUserId,handleDeleteUserId} iethu department controller const express = require("express")
// const {handleGetAllUsers,handleCreateNewUser,handleGetUserId,
//     handleUpdateUserId,handleDeleteUserId}=require("../controllers/userController.js",)




// const router=express.Router()

// router.route("/")
// .get(handleGetAllUsers)
// .post(handleCreateNewUser)


// router.route("/:id")
// .get(handleGetUserId)
// .put(handleUpdateUserId)
// .delete(handleDeleteUserId)




// module.exports=router   iethu users router , const express = require("express")
// const {handleGetAllUsers,handleCreateNewUser,handleGetUserId,
//     handleUpdateUserId,handleDeleteUserId}=require("../controllers/subController",)

// const router=express.Router()

// router.route("/")
// .get(handleGetAllUsers)
// .post(handleCreateNewUser)


// router.route("/:id")
// .get(handleGetUserId)
// .put(handleUpdateUserId)
// .delete(handleDeleteUserId)


// module.exports=router iethu department router, const express = require("express")
// const cors = require("cors")
// const {connectMongoDb} = require("./views/view")
// const userRoter=require("./routes/route")
// const cityRouter=require("./routes/cityroute")
// const markRouter=require("./routes/markroute")
// const SubRouter=require("./routes/subroute")


// const app =express();
// app.use(express.json());
// const port=8000;

// app.use(
//   cors({
//     origin:"http://localhost:5173",
//     methods:["GET","POST","PUT","DELETE","PATCH"],
//   })
// );

// app.use("/Users",userRoter)
// app.use("/City",cityRouter)
// app.use("/mark",markRouter)
// app.use("/subject",SubRouter)

// app.listen(port,(err)=>{
//     console.log(`app is running in port${port}`)
// })

// connectMongoDb("mongodb+srv://dhilipan1411:Dhilip@crud.s6rtr.mongodb.net/")
// .then(()=>console.log("connect"))
//   iethu index.js ietha files la vachi