const express=require("express");
const userc=require("../Controllers/user");
const router=express.Router();
router.route('/signup').post(userc.signup);
 router.route('/login').post(userc.login);
module.exports=router;