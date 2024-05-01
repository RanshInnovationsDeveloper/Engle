const express = require("express");
const router = express.Router();

const {
  fetchRememberButtonStatus,
  addToRemember,
  removeFromRemember,
} = require("../controllers/rememberControllers");

router.get("/fetchStatus", fetchRememberButtonStatus);
router.post("/add", addToRemember);
router.post("/remove", removeFromRemember);

module.exports = router;
