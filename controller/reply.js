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

  // const reply = new Reply({
  //   userId: userId,
  //   feedId: "604f2a68eb32b80d40a8eb6b",
  //   content: content,
  //   likeCount: 2,
  // });

  // reply
  //   .save()
  //   .then((reply) => {
  //     myReply = reply;
  //     return Feed.findById({ _id: "604f2a68eb32b80d40a8eb6b" });
  //   })
  //   .then((feed) => {
  //     feed.replyIds.push(myReply._id.toString());
  //     return feed.save();
  //   })
  //   .then((result) => {
  //     res.json({ message: "reply add success" });
  //   })
  //   .catch((error) => {
  //     if (!error.statusCode) {
  //       error.statusCode = 500;
  //     }
  //     next(error);
  //   });
};
