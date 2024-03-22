const express = require("express");
const router = express.Router();

const {getAllStrories, getStoryById}=require("../controllers/storyControllers");

router.get("/getAll", getAllStrories);
router.get("/getById/:id", getStoryById);

module.exports = router;