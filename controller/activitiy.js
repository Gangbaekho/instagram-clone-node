const { json } = require("body-parser");
const Activity = require("../model/activity");

exports.getActivities = (req, res, next) => {
  const userId = req.userId;

  Activity.find({ whomId: userId })
    .sort({ _id: -1 })
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
