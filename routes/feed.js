const express = require("express");

const feedController = require("../controller/feed");

const router = express.Router();

const isAuth = require("../middleware/isAuth");

router.post("/", isAuth, feedController.createFeed);

router.post("/test", feedController.test);

router.get("/populate", feedController.populateTest);

router.get("/", isAuth, feedController.getFeeds);

router.post("/like/increase", isAuth, feedController.increaseLike);

router.post("/like/decrease", isAuth, feedController.decreaseLike);

router.get("/:feedId", isAuth, feedController.getFeedDetail);

router.get("/v2/v2", isAuth, feedController.getFeedsV2);

module.exports = router;
