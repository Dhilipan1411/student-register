const express = require("express")
const cors = require("cors")
const {connectMongoDb} = require("./views/view")
const userRoter=require("./routes/route")
const cityRouter=require("./routes/cityroute")
const markRouter=require("./routes/markroute")
const SubRouter=require("./routes/subroute")


const app =express();
app.use(express.json());
const port=8000;

app.use(
  cors({
    origin:"http://localhost:5173",
    methods:["GET","POST","PUT","DELETE","PATCH"],
  })
);

app.use("/Users",userRoter)
app.use("/City",cityRouter)
app.use("/mark",markRouter)
app.use("/subject",SubRouter)

app.listen(port,(err)=>{
    console.log(`app is running in port${port}`)
})

connectMongoDb("mongodb+srv://dhilipan1411:Dhilip@crud.s6rtr.mongodb.net/")
.then(()=>console.log("connect"))

