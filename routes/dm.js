const express = require("express");

const dmController = require("../controller/dm");

const router = express.Router();

const isAuth = require("../middleware/isAuth");

router.post("/text", isAuth, dmController.createDmText);

module.exports = router;
