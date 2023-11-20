const express=require("express")
const router=express.Router();
const controller=require("../Controllers/wxyz");
const contr=require("../Controllers/user");
router.route("/").get(contr.protect,controller.getAllBlogs).post(contr.protect,controller.createblog);
router.route("/:id").get(contr.protect,controller.getblog)
.patch(contr.protect,controller.updateblog)
.delete(contr.protect,contr.restrict('admin'),controller.deleteblog);

module.exports=router;