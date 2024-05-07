const express=require("express");
const router=express.Router();

const {createSubscription,updateSubscription,generateToken,validateToken,getSubscriptionData, isSubscribed}=require("../controllers/subscriptionControllers")

router.post("/create",createSubscription);
router.post("/update",updateSubscription);
router.post("/generatetoken",generateToken);
router.post("/validatetoken",validateToken);
router.post("/getsubscriptiondata",getSubscriptionData);
router.get("/isSubscribed",isSubscribed)

module.exports=router;