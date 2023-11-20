const express=require("express");
const router=require("./Routes/xyz");
const user=require("./Routes/user");
let app=express();
app.use(express.json());

const mongoose=require("mongoose");
const dotenv=require('dotenv');
dotenv.config();
// console.log(process.env);
mongoose.connect(process.env.CONN_STR,{
}).then((conn)=>{
    console.log("DB CONNECTED");
}).catch((error)=>{
    console.log("ERROR OCCURED");
});

app.use("/api/posts",router);
app.use("/api/",user);
const port=9753;
app.listen(port,()=>{
    console.log("running on port 9753");
})