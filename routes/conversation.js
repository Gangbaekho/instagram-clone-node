const express = require("express");

const conversationController = require("../controller/conversation");

const router = express.Router();

router.post("/", conversationController.createConversation);

module.exports = router;
