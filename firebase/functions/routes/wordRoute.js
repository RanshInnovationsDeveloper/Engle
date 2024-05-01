const express = require("express");
const router = express.Router();
const {fetchWord}=require("../controllers/wordGeneratorControllers");


router.post("/fetchword",fetchWord);

module.exports = router;
