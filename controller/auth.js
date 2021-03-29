const User = require("../model/user");
const Follow = require("../model/follow");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = require("../util/jwtSecretKey.s");
const { validationResult } = require("express-validator/check");

exports.signup = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Invalid input values");
    error.statusCode = 422;
    throw error;
  }

  const email = req.body.email;
  const password = req.body.password;
  const passwordCheck = req.body.passwordCheck;
  const nickName = req.body.nickName;

  if (password !== passwordCheck) {
    const error = new Error("passwords are not equal.");
    error.statusCode = 422;
    throw error;
  }

  bcrypt
    .hash(password, 12)
    .then((encryptedPassword) => {
      const user = new User({
        email: email,
        nickName: nickName,
        password: encryptedPassword,
      });

      return user.save();
    })
    .then((user) => {
      const follow = new Follow({
        followerId: user._id.toString(),
        followeeId: user._id.toString(),
      });
      return follow.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "Created User!",
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      return next(error);
    });
};

exports.signin = (req, res, next) => {
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
  let loadedUser;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = new Error("A user with this email could not be found");
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Wrong password!");
        error.statusCode = 401;
        throw error;
      }

      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString(),
        },
        JWT_SECRET_KEY,
        { expiresIn: "10 days" }
      );
      res.status(200).json({
        token: token,
        userId: loadedUser._id.toString(),
        userNickName: loadedUser.nickName,
        userProfileImageUrl: loadedUser.profileImageUrl,
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      return next(error);
    });
};
