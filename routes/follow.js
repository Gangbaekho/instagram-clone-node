const express = require("express");

const isAuth = require("../middleware/isAuth");
const followController = require("../controller/follow");

const router = express.Router();

router.post("/", isAuth, followController.addFollowRelationship);

module.exports = router;
