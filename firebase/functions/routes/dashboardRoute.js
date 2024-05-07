const express=require('express');
const router=express.Router();

const {addStoryPreference,fetchStoryPreference}=require('../controllers/dashboardController');

router.get("/fetchStoryPreference",fetchStoryPreference)
router.post("/addStoryPreference",addStoryPreference)

module.exports=router;