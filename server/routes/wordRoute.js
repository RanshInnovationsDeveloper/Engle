const express = require("express");
const router = express.Router();
const {fetchWord, addWord}=require("../controllers/wordControllers");


router.post("/fetchword",fetchWord);
router.post("/addword",addWord);


const {fetchWord, addWord}=require("../controllers/wordControllers");


router.post("/fetchword",fetchWord);
router.post("/addword",addWord);

module.exports = router;
