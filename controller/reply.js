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
      feed.replyCount++;
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

exports.increaseLike = (req, res, next) => {
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
      reply.likeUserIds.push(userId);
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

exports.decreaseLike = (req, res, next) => {
  const userId = req.userId;
  const replyId = req.body.replyId;

  Reply.findOne({ _id: replyId })
    .then((reply) => {
      if (!reply) {
        const error = new Error("reply not found.");
        error.statusCode = 500;
        throw error;
      }

      reply.likeCount--;
      const filteredLikeUserIds = reply.likeUserIds.filter((likeUserId) => {
        return likeUserId.toString() !== userId;
      });
      reply.likeUserIds = filteredLikeUserIds;
      return reply.save();
    })
    .then((reply) => {
      res.json({ message: "reply like decrease success" });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.getRepliesTest = (req, res, next) => {
  const feedId = req.params.feedId;

  Reply.find({ feedId: feedId })
    .sort({ _id: -1 })
    .then((replies) => {
      res.json({ message: "success", replies: replies });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.getMoreReplies = (req, res, next) => {
  const feedId = req.body.feedId;
  const skip = req.body.skip;
  const limit = 10;

  Reply.find({ feedId: feedId })
    .skip(skip)
    .limit(limit)
    .then((replies) => {
      if (!replies) {
        const error = new Error("There is no more reply to send");
        error.statusCode = 404;
        throw error;
      }
      res.json({ message: "success", replies: replies });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.createRereply = (req, res, next) => {
  const userId = req.userId;
  const replyId = req.body.replyId;
  const content = req.body.content;

  let loadedUser;
  let loadedReply;
  User.findOne({ _id: userId })
    .then((user) => {
      if (!user) {
        const error = new Error("User not found");
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return Reply.findOne({ _id: replyId });
    })
    .then((reply) => {
      if (!reply) {
        const error = new Error("Reply not found");
        error.statusCode = 404;
        throw error;
      }

      loadedReply = reply;

      const rereply = new Reply({
        userId: userId,
        userNickName: loadedUser.nickName,
        userProfileImageUrl: loadedUser.profileImageUrl,
        parentReplyId: reply._id,
        content: content,
      });

      return rereply.save();
    })
    .then((rereply) => {
      loadedReply.rereplyCount++;
      return loadedReply.save();
    })
    .then((result) => {
      res.json({ message: "rereply add success!" });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.getRereplies = (req, res, next) => {
  const parentReplyId = req.params.replyId;
  const skip = req.body.skip || 0;

  Reply.find({ parentReplyId: parentReplyId })
    .skip(skip)
    .limit(5)
    .then((replies) => {
      res.json({ message: "success", replies: replies });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};
