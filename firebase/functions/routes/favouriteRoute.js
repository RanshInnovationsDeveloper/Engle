//Different Imports
const express = require("express");
const router = express.Router();

//import of controller
const {
  fetchFavouriteButtonStatus,
  addToFavourite,
  removeFromFavourite,
  fetchFavouriteItems,
} = require("../controllers/favouriteControllers");

//Different routes
router.get("/fetchStatus", fetchFavouriteButtonStatus);
router.get("/fetchItems", fetchFavouriteItems);
router.post("/add", addToFavourite);
router.post("/remove", removeFromFavourite);

//Exporting the router for further use 
module.exports = router;
