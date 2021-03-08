const Reply = require("../model/reply");

exports.createReply = (req, res, next) => {
  const reply = new Reply({
    userId: "60459cb019ffd74380d5b4ca",
    feedId: "6045a942a22eba2be036836f",
    rereplyIds: ["6045ab53e5202f42c8a8bbfd", "6045ab53e5202f42c8a8bbfd"],
    content: "test",
    likeCount: 2,
  });

  reply
    .save()
    .then((result) => {
      console.log("Reply insert success");
    })
    .catch((error) => {
      console.log(error);
    });
};
