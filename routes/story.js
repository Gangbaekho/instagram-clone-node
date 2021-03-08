const express = require("express");

const storyController = require("../controller/story");

const router = express.Router();

router.post("/", storyController.createStory);

module.exports = router;
