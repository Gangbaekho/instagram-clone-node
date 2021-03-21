const mongoose = require("mongoose");

const User = require("../model/user");
const Feed = require("../model/feed");
const Reply = require("../model/reply");
const feed = require("../model/feed");

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
  const userId = req.userId;

  Feed.find()
    .populate({ path: "replyIds", perDocumentLimit: 2 })
    .sort({ createdAt: -1 })
    .then((feeds) => {
      res.json({
        message: "success",
        feeds: feeds.map((feed) => {
          isHeartClicked = feed.likeUserIds.indexOf(userId) > -1;
          return {
            ...feed._doc,
            isHeartClicked: isHeartClicked,
            replyTotalCount: feed.replyIds.length,
          };
        }),
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.increaseLike = (req, res, next) => {
  const userId = req.userId;
  const feedId = req.body.feedId;

  Feed.findOne({ _id: feedId })
    .then((feed) => {
      if (!feed) {
        const error = new Error("Feed not found");
        error.statusCode = 500;
        throw error;
      }

      feed.likeCount++;
      feed.likeUserIds.push(userId);
      return feed.save();
    })
    .then((feed) => {
      res.json({ message: "like increase success" });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.decreaseLike = (req, res, next) => {
  const userId = req.userId;
  const feedId = req.body.feedId;

  Feed.findOne({ _id: feedId })
    .then((feed) => {
      if (!feed) {
        const error = new Error("Feed not found");
        error.statusCode = 500;
        throw error;
      }

      feed.likeCount--;
      const filteredLikeUserIds = feed.likeUserIds.filter((likeUserId) => {
        return likeUserId.toString() !== userId.toString();
      });
      feed.likeUserIds = filteredLikeUserIds;
      return feed.save();
    })
    .then((feed) => {
      res.json({ message: "like decrease success" });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.testGetFeeds = (req, res, next) => {
  const userId = "123";

  let loadedFeeds;

  Feed.find()
    .sort({ createdAt: -1 })
    .then((feeds) => {
      loadedFeeds = feeds;
    })
    .catch();
};
