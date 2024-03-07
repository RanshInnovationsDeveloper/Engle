const express = require("express");
const router = express.Router();

const { addUnseen, getUnseen } = require("../controllers/unseenControllers");

router.get("/getUnseen", getUnseen);
router.post("/addUnseen", addUnseen);

module.exports = router;
