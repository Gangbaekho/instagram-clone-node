const Activity = require("../model/activity");

exports.getActivities = (req, res, next) => {
  const userId = req.userId;

  Activity.find({ whomId: userId })
    .sort({ _id: -1 })
    .limit(20)
    .populate("feedId")
    .populate("replyId")
    .populate("whoId")
    .then((activities) => {
      res.json({ message: "succes", activities: activities });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};
