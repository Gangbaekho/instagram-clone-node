const express = require("express");

const feedController = require("../controller/feed");

const router = express.Router();

const isAuth = require("../middleware/isAuth");

router.post("/", isAuth, feedController.createFeed);

module.exports = router;
