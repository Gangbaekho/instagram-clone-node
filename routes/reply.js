const express = require("express");

const replyController = require("../controller/reply");

const router = express.Router();

const isAuth = require("../middleware/isAuth");

router.post("/", isAuth, replyController.createReply);

module.exports = router;
