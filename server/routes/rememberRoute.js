const express = require("express");
const router = express.Router();

const {
  fetchRememberButtonStatus,
  addToRemember,
  removeFromRemember,
  fetchAllRememberItems,
} = require("../controllers/rememberControllers");

router.get("/fetchStatus", fetchRememberButtonStatus);
router.get("/fetchAllItems", fetchAllRememberItems);
router.post("/add", addToRemember);
router.post("/remove", removeFromRemember);

module.exports = router;
