const express = require("express");

const dmController = require("../controller/dm");

const router = express.Router();

router.post("/", dmController.createDm);

module.exports = router;
