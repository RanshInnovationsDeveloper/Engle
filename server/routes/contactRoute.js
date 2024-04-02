//Imports
const express = require("express");
const router = express.Router();

//import of controller
const contact = require("../controllers/contactControllers");

//Route
router.post("/", contact);

//Exporting the router for further use 
module.exports = router;
