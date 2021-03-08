const express = require("express");

const replyController = require("../controller/reply");

const router = express.Router();

router.post("/", replyController.createReply);

module.exports = router;
