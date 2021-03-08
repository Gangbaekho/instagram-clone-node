const User = require("../model/user");

const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator/check");

exports.signup = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log("error occured! check the errors");
    console.log(errors.array());
    return res.status(422).json({
      message: "not valid email or password",
    });
  }

  const email = req.body.email;
  const password = req.body.password;
  const passwordCheck = req.body.passwordCheck;

  if (password !== passwordCheck) {
    return res.status(422).json({
      message: "passwords are not equal.",
    });
  }

  bcrypt
    .hash(password, 12)
    .then((encryptedPassword) => {
      const user = new User({
        email: email,
        password: encryptedPassword,
      });

      return user.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "Created User!",
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
