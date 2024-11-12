const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
 
     department:String,
     subjects: [
          String,
          
     
          // {
          //      name: { type: String, required: true ,uppercase:(true)},
          //      mark: { type: Number, required: true }
          //    }
     ],
     mark:[Number]
});

const department = mongoose.model("department", departmentSchema);

module.exports = department;
