const express = require("express");

const feedController = require("../controller/feed");

const router = express.Router();

const isAuth = require("../middleware/isAuth");

router.post("/", isAuth, feedController.createFeed);

router.post("/test", feedController.test);

router.get("/populate", feedController.populateTest);

router.get("/", feedController.getFeeds);

module.exports = router;
