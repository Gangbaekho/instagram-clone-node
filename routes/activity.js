const express = require("express");

const activityController = require("../controller/activitiy");

const router = express.Router();

const isAuth = require("../middleware/isAuth");

router.post("/", isAuth, activityController.createActivity);

module.exports = router;
