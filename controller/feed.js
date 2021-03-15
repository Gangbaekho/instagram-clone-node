const mongoose = require("mongoose");

const User = require("../model/user");
const Feed = require("../model/feed");

exports.createFeed = (req, res, next) => {
  const userId = req.userId;
  const content = req.body.content;
  const contentUrl = req.body.contentUrl;

  User.findOne({ _id: userId })
    .then((user) => {
      if (!user) {
        const error = new Error("User not founded.");
        error.statusCode = 401;
        throw error;
      }
      const feed = new Feed({
        userId: userId,
        content: content,
        contentUrls: [contentUrl],
      });

      return feed.save();
    })
    .then((result) => {
      res.json({ message: "request was accepted by server" });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.test = (req, res, next) => {
  const myText = req.body.test;
  const myFile = req.file;

  console.log(myText);
  console.log(myFile);
};
