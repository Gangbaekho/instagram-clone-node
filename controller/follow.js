const { FOLLOW } = require("../constant/activityType");

const Follow = require("../model/follow");
const Activity = require("../model/activity");

exports.addFollowRelationship = (req, res, next) => {
  const userId = req.userId;
  const followeeId = req.body.followeeId;

  const follow = new Follow({ followerId: userId, followeeId: followeeId });

  follow
    .save()
    .then((result) => {
      const activity = new Activity({
        whoId: userId,
        whomId: followeeId,
        activityType: FOLLOW,
      });
      return activity.save();
    })
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
