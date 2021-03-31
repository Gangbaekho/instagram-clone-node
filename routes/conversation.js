const express = require("express");

const conversationController = require("../controller/conversation");

const router = express.Router();

const isAuth = require("../middleware/isAuth");

router.post("/", isAuth, conversationController.createConversation);

router.get("/", isAuth, conversationController.getConversations);

module.exports = router;
