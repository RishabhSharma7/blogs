const express=require("express");
const userc=require("../Controllers/user");
const router=express.Router();
router.route('/register').post(userc.signup);
 router.route('/login').post(userc.login);
 console.log("testing git...")
module.exports=router;