const express = require("express");

const activityController = require("../controller/activitiy");

const router = express.Router();

router.post("/", activityController.createActivity);

module.exports = router;
