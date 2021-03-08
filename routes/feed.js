const express = require("express");

const feedController = require("../controller/feed");

const router = express.Router();

router.post("/", feedController.createFeed);

module.exports = router;
