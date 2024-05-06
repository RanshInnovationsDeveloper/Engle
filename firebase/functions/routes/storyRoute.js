//Different imports
const express = require("express");
const router = express.Router();

//importing controllers
const {getAllStories, getStoryById, getStoryCount,updateStoryCount, getScrollPercentage,updateScrollPercentage}=require("../controllers/storyControllers");

//different routes
router.get("/getAll", getAllStories);
router.get("/getById/:id", getStoryById);
router.get("/getStoryCount",getStoryCount)
router.post("/updateStoryCount",updateStoryCount)
router.get("/getScrollPercentage",getScrollPercentage)
router.post("/updateScrollPercentage",updateScrollPercentage)

//exporting router for further use 
module.exports = router;