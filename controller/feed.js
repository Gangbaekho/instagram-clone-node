const mongoose = require("mongoose");

const User = require("../model/user");
const Feed = require("../model/feed");

exports.createFeed = (req, res, next) => {
  const userId = req.userId;
  const content = req.body.content;
  const image = req.file;

  if (!image) {
    const error = new Error("image not contained");
    error.statusCode = 401;
    throw error;
  }

  const imageUrl = image.path.replace("\\", "/");

  User.findOne({ _id: userId })
    .then((user) => {
      if (!user) {
        const error = new Error("User not founded.");
        error.statusCode = 401;
        throw error;
      }
      const feed = new Feed({
        userId: userId,
        userNickName: user.nickName,
        userProfileImageUrl: user.profileImageUrl,
        content: content,
        contentUrls: [imageUrl],
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

exports.populateTest = (req, res, next) => {
  Feed.findById("604f2a68eb32b80d40a8eb6b")
    .populate("replyIds")
    .then((feed) => {
      res.json({ data: feed });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.getFeeds = (req, res, next) => {
  Feed.find()
    .then((feeds) => {
      res.json({ message: "succes", feeds: feeds });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};
