const User=require("../Models/user");
const asyncErrorHandler=require("../folder/asyncerrorhandler");
const jwt=require("jsonwebtoken");
const signToken=id=>{
    return jwt.sign({id:id},process.env.SECRETSTR,{
        expiresIn:process.env.EXPIRES
    })
}
exports.signup=asyncErrorHandler(async(req,res,next)=>{
    const newuser=await User.create(req.body);
    
    res.status(201).json({
        status:'success',
        data:{
            user:newuser
        }
    })
})

exports.login=asyncErrorHandler(async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email || !password){
        const error=new CustomError('Pls provide email and password',400);
        return next(error);
    }
    const user=await User.findOne({email})
    const token=signToken(user._id);
    
    res.status(201).json({
        status:'success',
        token,
        data:{
            user
        }
    })

})
exports.restrict=(role)=>{
    return(req,res,next)=>{   
        if(req.user.role!=role){
            const error=new CustomError("You dont have permission",403);
            next(error)
        }     
        next();
    }
}