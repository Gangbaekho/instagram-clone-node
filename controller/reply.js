const User = require("../model/user");
const Feed = require("../model/feed");
const Reply = require("../model/reply");

exports.createReply = (req, res, next) => {
  const userId = req.userId;
  const feedId = req.body.feedId;
  const content = req.body.content;

  let myReply;

  User.findOne({ _id: userId })
    .then((user) => {
      if (!user) {
        const error = new Error("User not found.");
        error.statusCode = 401;
        throw error;
      }

      const reply = new Reply({
        userId: userId,
        userNickName: user.nickName,
        userProfileImageUrl: user.profileImageUrl,
        feedId: feedId,
        content: content,
      });

      return reply.save();
    })
    .then((reply) => {
      myReply = reply;
      return Feed.findById({ _id: feedId });
    })
    .then((feed) => {
      feed.replyIds.push(myReply._id.toString());
      return feed.save();
    })
    .then((result) => {
      res.json({ message: "reply add success" });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.createLike = (req, res, next) => {
  const userId = req.userId;
  const replyId = req.body.replyId;

  Reply.findOne({ _id: replyId })
    .then((reply) => {
      if (!reply) {
        const error = new Error("reply not found.");
        error.statusCode = 500;
        throw error;
      }

      reply.likeCount++;
      return reply.save();
    })
    .then((reply) => {
      res.json({ message: "reply like increase success" });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};
