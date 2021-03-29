const express = require("express");

const activityController = require("../controller/activitiy");

const router = express.Router();

const isAuth = require("../middleware/isAuth");

router.get("/", isAuth, activityController.getActivities);

module.exports = router;
