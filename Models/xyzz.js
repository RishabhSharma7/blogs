const mongoose=require("mongoose");
const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    subtitle:{
        type:String,
        required:true,
        unique:true,
        
    },
    description:{
        type:String,
        required:true
    },
    duration:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    coverImage:{
        type:String
    },
});

const Blog=mongoose.model('Blog',blogSchema);
module.exports=Blog;
