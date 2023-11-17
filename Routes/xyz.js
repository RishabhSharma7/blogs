const express=require("express")
const router=express.Router();
const controller=require("../Controllers/wxyz");
router.route("/").get(controller.getAllBlogs).post(controller.createblog);
router.route("/:id").get(controller.getblog).patch(controller.updateblog).delete(controller.deleteblog);

module.exports=router;