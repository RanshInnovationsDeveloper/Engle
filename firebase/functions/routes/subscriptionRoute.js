const express=require("express");
const router=express.Router();

const {createSubscription,updateSubscription,generateToken}=require("../controllers/subscriptionControllers")

router.post("/create",createSubscription);
router.post("/update",updateSubscription);
router.post("/generatetoken",generateToken);

module.exports=router;