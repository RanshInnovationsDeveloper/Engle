const express = require("express");
const router = express.Router();
const contact = require("../controllers/contactControllers");

router.post("/", contact);

module.exports = router;
