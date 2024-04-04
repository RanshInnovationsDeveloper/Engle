//Different Imports
const express = require("express");
const router = express.Router();

//import of controller
const {
  addToSeen
} = require("../controllers/seenControllers");

//Different routes
router.post("/add", addToSeen);

//Exporting the router for further use 
module.exports = router;
