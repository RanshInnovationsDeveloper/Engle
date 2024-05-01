const express = require("express");
const router = express.Router();

const {
  fetchUnrememberButtonStatus,
  addToUnremember,
  removeFromUnremember,
  fetchAllUnrememberItems,
} = require("../controllers/unrememberControllers");

router.get("/fetchStatus", fetchUnrememberButtonStatus);
router.get("/fetchAllItems", fetchAllUnrememberItems);
router.post("/add", addToUnremember);
router.post("/remove", removeFromUnremember);

module.exports = router;
