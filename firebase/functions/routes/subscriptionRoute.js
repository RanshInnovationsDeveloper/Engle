const express=require("express");
const router=express.Router();

const {createSubscription,updateSubscription,generateToken,validateToken,getSubscriptionData}=require("../controllers/subscriptionControllers")

router.post("/create",createSubscription);
router.post("/update",updateSubscription);
router.post("/generatetoken",generateToken);
router.post("/validatetoken",validateToken);
router.post("/getsubscriptiondata",getSubscriptionData);


module.exports=router;