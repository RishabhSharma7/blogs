const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const crypto=require("crypto");
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        validate:validator.isEmail
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    confirmpassword:{
        type:String,
        required:true,
        validate:{
            validator:function(val){
                return val==this.password;
            },
            message:"Password and confirm password dont match" 
        }
    },
    
    Number:{
        type:Number 
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    passwordChangedAt:Date,
    passwordresettoken:{
        type:String
    },
    passwordresettokenexpire:Date,
})
userSchema.pre('save',async function(next){
    if(!this.isModified('password'))return next();
    //encrypt the password
    this.password=await bcrypt.hash(this.password,8);
    this.confirmpassword=undefined;
    next();
});
userSchema.methods.comparePassword= async function(pswd,pswdDB){
    return await bcrypt.compare(pswd,pswdDB);
}

const User=mongoose.model("User",userSchema);
module.exports=User;

