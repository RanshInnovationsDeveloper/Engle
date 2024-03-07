const express = require("express");
const router = express.Router();

const {
  fetchFavouriteButtonStatus,
  addToFavourite,
  removeFromFavourite,
  fetchFavouriteItems,
} = require("../controllers/favouriteControllers");

router.get("/fetchStatus", fetchFavouriteButtonStatus);
router.get("/fetchItems", fetchFavouriteItems);
router.post("/add", addToFavourite);
router.post("/remove", removeFromFavourite);

module.exports = router;
