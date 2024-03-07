const express = require("express");
const router = express.Router();

const { addStory, getStories } = require("../controllers/storyControllers");

router.get("/getStories", getStory);
router.post("/addStory", addStory);

module.exports = router;
