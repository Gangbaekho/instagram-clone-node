const Activity = require("../model/activity");

exports.createActivity = (req, res, next) => {
  const activity = new Activity({
    userId: "60459cb019ffd74380d5b4ca",
    replyId: "6045a942a22eba2be036836f",
  });

  activity
    .save()
    .then((result) => {
      console.log("Acitivity insert success");
    })
    .catch((error) => {
      console.log(error);
    });
};
