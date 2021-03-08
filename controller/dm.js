const DM = require("../model/dm");

exports.createDm = (req, res, next) => {
  const dm = new DM({
    userId: "60459cb019ffd74380d5b4ca",
    message: "hello?",
  });

  dm.save()
    .then((result) => {
      console.log("DM insert success!");
    })
    .catch((error) => {
      console.log(error);
    });
};
