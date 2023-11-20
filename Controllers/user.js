const User=require("../Models/user");
const asyncErrorHandler=require("../folder/asyncerrorhandler");
const jwt=require("jsonwebtoken");
const CustomError = require("../folder/customerror");
const util=require("util");
const Blog=require("../Models/xyzz");
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
    const user=await User.findOne({email}).select('+password');
   // console.log("users is-", user.password);
    if (!(await user.comparePassword(password, user.password))) {
        const error = new CustomError("Incorrect email or password", 400);
        return next(error)
    }
    
    const token=signToken(user._id);
    
    res.status(201).json({
        status:'success',
        token,
        data:{
            user
        }
    })

})
exports.protect=asyncErrorHandler(async(req,res,next)=>{
    const testtoken=req.headers.authorization;
    let token;
    if(testtoken && testtoken.startsWith('Bearer')){
         token=testtoken.split(' ')[1];
    }
    if(!token){
        next(new CustomError("Not logged in",401))
    }
    console.log(token);
    const decodedToken = await util.promisify(jwt.verify)(token, process.env.SECRETSTR);
    console.log(decodedToken);
    const user = await User.findById(decodedToken.id);
    req.user=user;
    next();
})

exports.restrict=(role)=>{
    return(req,res,next)=>{   
        //id - params
        const blogid =  Blog.findById(req.params.id);

       // console.log("heloooooob",blogid);
        //find blog data with id
        //get createdBy
        const createdBy=blogid.createdBy;
         if (createdBy !== req.user._id && req.user.role !== role){
            const error=new CustomError("You dont have permission",403);
            next(error)
         }


        // if(req.user.role!=role ){
        //     const error=new CustomError("You dont have permission",403);
        //     next(error)
        // }     
        next();
    }
}