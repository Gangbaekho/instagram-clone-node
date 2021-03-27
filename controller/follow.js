const { json } = require("body-parser");
const Follow = require("../model/follow");

exports.addFollowReplation = (req, res, next) => {
  const userId = req.userId;
  const followeeId = req.body.followeeId;

  const follow = new Follow({ followerId: userId, followeeId: followeeId });

  follow
    .save()
    .then((result) => {
      res.json({ message: "follow success" });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};
