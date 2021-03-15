const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.ObjectId;
const Feed = require("../model/feed");

exports.createFeed = (req, res, next) => {
  const userId = req.userId;
  const content = req.body.content;
  const contentUrl = req.body.contentUrl;

  const feed = new Feed({
    userId: userId,
    content: content,
    contentUrls: [contentUrl],
  });

  feed
    .save()
    .then((result) => {
      res.json({ message: "request was accepted by server" });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });

  // const feed = new Feed({
  //   userId: "6045a7f8330ee40f98207c6a",
  //   content: "test",
  //   replyIds: [
  //     "6045a7f8330ee40f98207c6a",
  //     "6045a7f8330ee40f98207c6a",
  //     "6045a7f8330ee40f98207c6a",
  //   ],
  //   contentUrls: ["test", "test", "test"],
  //   likeCount: 1000,
  // });

  // feed
  //   .save()
  //   .then((result) => {
  //     console.log("Feed insert success");
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
};
