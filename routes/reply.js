const express = require("express");

const replyController = require("../controller/reply");

const router = express.Router();

const isAuth = require("../middleware/isAuth");

router.post("/", isAuth, replyController.createReply);

router.post("/like/increase", isAuth, replyController.increaseLike);

router.post("/like/decrease", isAuth, replyController.decreaseLike);

router.post("/more", replyController.getMoreReplies);

router.post("/rereply", isAuth, replyController.createRereply);

router.get("/:replyId/rereply", replyController.getRereplies);

module.exports = router;
