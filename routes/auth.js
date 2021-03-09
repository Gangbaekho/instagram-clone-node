const express = require("express");

// VALIDATOR
const { body } = require("express-validator/check");

const authController = require("../controller/auth");

const router = express.Router();

router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a vaild email")
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
    body("passwordCheck").trim().isLength({ min: 5 }),
  ],
  authController.signup
);

router.post(
  "/signin",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a vaild email")
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
  ],
  authController.signin
);

module.exports = router;
