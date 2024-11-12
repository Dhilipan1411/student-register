const mongoose = require("mongoose");


const crudSchema = mongoose.Schema({
    RollNo: {
      type: Number,
      required: [true, "please enter Roll Number"]
    },
    name: {
      type: String,
      required: [true, "please enter name"],
      uppercase: true,
    },
    city: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "city"
    },
    age: {
      type: Number,
      required: true,
    },
    department: {
      type: mongoose.SchemaTypes.ObjectId,
      uppercase:(true),
      ref: "department",
    },
    subjects: [
      {
        name: { type: String, required: true ,uppercase:(true)},
        mark: { type: Number, required: true },
      }
    ],
    
    gender: {
      type: String,
      required: true,
      uppercase: true,
    },
  });
  
  const users = mongoose.model("users", crudSchema);
  module.exports = users;
  




  
//   const mongoose = require("mongoose");

// const crudSchema = mongoose.Schema({
//   RollNo: {
//     type: Number,
//     required: [true, "please enter Roll Number"]
//   },
//   name: {
//     type: String,
//     required: [true, "please enter name"],
//     uppercase: true,
//   },
//   city: {
//     type: mongoose.SchemaTypes.ObjectId,
//     ref: "city"
//   },
//   age: {
//     type: Number,
//     required: true,
//   },
//   department: {
//     type: mongoose.SchemaTypes.ObjectId,
//     ref: "department",
//   },
//   subjects: [
//     {
//       name: { type: String, required: true, uppercase: true },
//       mark: { type: Number, required: true } // Storing marks here
//     }
//   ],
//   percentage: {
//     type: String,
//     required: true,
//     uppercase: true,
//   },
//   gender: {
//     type: String,
//     required: true,
//     uppercase: true,
//   },
// });

// const Users = mongoose.model("Users", crudSchema);
// module.exports = Users;
