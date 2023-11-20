const CustomError=require("../folder/customerror");
const Blog=require("../Models/xyzz");

const asyncErrorHandler=require("../folder/asyncerrorhandler");
exports.getAllBlogs=asyncErrorHandler(async(req,res)=>{
    let query=Blog.find();
    if(req.query.sort){
        const sortBy=req.query.sort.split(',').join(' ');
        query=query.sort(sortBy);
    }else{
        query=query.sort('duration');
    }
    const page=req.query.page*1 ||1;
    const limit=req.query.limit*1||3;
    const skip=(page-1)*limit;
    query=query.skip(skip).limit(limit);
    if(req.query.page){
        const blogss=await Blog.countDocuments();
        if(skip>=blogss){
            throw new Error("Page not found");
        }
    }
    const allbllogs=await query;
        res.status(200).json({
           status:"success",
           data:{
            blog:allbllogs
        }
    });
})

exports.getblog=asyncErrorHandler(async(req,res,next)=>{
        const blog=await Blog.findById(req.params.id);
        if(!blog){
            console.log("error ");
            const error=new CustomError('Blog not found',404);
            return next(error);
        }
        res.status(200).json({
            status:"success",
            data:{
                blog
            }
    });

});

exports.createblog=asyncErrorHandler(async(req,res,next)=>{
    const blog=await Blog.create(req.body);
    res.status(201).json({
        status:"success",
        data:{
            blog
        }
    })
});
exports.updateblog=asyncErrorHandler(async(req,res,next)=>{
       const updateblog=await Blog.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
       if(!updateblog){
        console.log("error ");
        const error=new CustomError('Blog not found',404);
        return next(error);
    }
       res.status(200).json({
          status:"success",
          data:{
            blog:updateblog}
    });
});

exports.deleteblog=asyncErrorHandler(async(req,res,next)=>{
    const deleteblog=await Blog.findByIdAndDelete(req.params.id);
    console.log(deleteblog);
    if(!deleteblog){
        console.log("error ");
        const error=new CustomError('Blog not found',404);
        return next(error);
    }
    res.status(204).json({
        status:"success"
    });

});
