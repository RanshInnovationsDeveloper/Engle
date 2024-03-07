const express = require("express");
const router = express.Router();

const { addStory, getStories } = require("../controllers/storyControllers");

router.get("/getStories", getStories);
router.post("/addStory", addStory);

module.exports = router;
