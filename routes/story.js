const express = require("express");

const storyController = require("../controller/story");

const router = express.Router();

const isAuth = require("../middleware/isAuth");

router.post("/", isAuth, storyController.createStory);

module.exports = router;
