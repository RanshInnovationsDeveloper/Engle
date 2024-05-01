//Different imports
const express = require("express");
const router = express.Router();

//importing controllers
const {getAllStrories, getStoryById}=require("../controllers/storyControllers");

//different routes
router.get("/getAll", getAllStrories);
router.get("/getById/:id", getStoryById);

//exporting router for further use 
module.exports = router;