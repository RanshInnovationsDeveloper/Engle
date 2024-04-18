//Imports
const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  error: "Too many contact requests created from this IP, please try again after 15 minutes"
});


//import of controller
const contact = require("../controllers/contactControllers");

//Route
router.post("/",contactLimiter,contact);

//Exporting the router for further use 
module.exports = router;
