const Feed = require("../model/feed");
const Reply = require("../model/reply");

exports.createReply = (req, res, next) => {
  const userId = req.userId;
  const content = req.body.content;

  let myReply;

  const reply = new Reply({
    userId: userId,
    feedId: "604f2a68eb32b80d40a8eb6b",
    content: content,
    likeCount: 2,
  });

  reply
    .save()
    .then((reply) => {
      myReply = reply;
      return Feed.findById({ _id: "604f2a68eb32b80d40a8eb6b" });
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
