const express = require("express");

const replyController = require("../controller/reply");

const router = express.Router();

const isAuth = require("../middleware/isAuth");

router.post("/", isAuth, replyController.createReply);

router.post("/like", isAuth, replyController.createLike);

module.exports = router;
