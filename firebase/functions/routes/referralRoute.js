const express=require('express');
const router=express.Router();

const {createReferral,updateReferralData,verifyReferralCode,updateWalletAmount}=require('../controllers/referralControllers');

router.post('/create',createReferral);
router.post('/update',updateReferralData);
router.post('/verify',verifyReferralCode);
router.post('/updatewallet',updateWalletAmount);


module.exports=router;