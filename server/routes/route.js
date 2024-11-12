const express = require("express")
const {handleGetAllUsers,handleCreateNewUser,handleGetUserId,
    handleUpdateUserId,handleDeleteUserId}=require("../controllers/userController.js",)




const router=express.Router()

router.route("/")
.get(handleGetAllUsers)
.post(handleCreateNewUser)


router.route("/:id")
.get(handleGetUserId)
.put(handleUpdateUserId)
.delete(handleDeleteUserId)




module.exports=router