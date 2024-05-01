const express = require("express");
const router = express.Router();

const {
  fetchUnrememberButtonStatus,
  addToUnremember,
  removeFromUnremember,
} = require("../controllers/unrememberControllers");

router.get("/fetchStatus", fetchUnrememberButtonStatus);
router.post("/add", addToUnremember);
router.post("/remove", removeFromUnremember);

module.exports = router;
