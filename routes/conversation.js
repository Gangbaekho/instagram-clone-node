const express = require("express");

const conversationController = require("../controller/conversation");

const router = express.Router();

const isAuth = require("../middleware/isAuth");

router.post("/", isAuth, conversationController.createConversation);

module.exports = router;
