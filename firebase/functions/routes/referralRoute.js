const express=require('express');
const router=express.Router();

const {createReferral,updateReferralData,verifyReferralCode}=require('../controllers/referralControllers');

router.post('/create',createReferral);
router.post('/update',updateReferralData);
router.post('/verify',verifyReferralCode);


module.exports=router;