const express = require("express");

const userController = require("../controller/user");

const router = express.Router();

const isAuth = require("../middleware/isAuth");

router.post("/", isAuth, userController.createUser);

module.exports = router;
