const Conversation = require("../model/conversation");

exports.createConversation = (req, res, next) => {
  const conversation = new Conversation({
    talkers: ["60459cb019ffd74380d5b4ca", "6045a7f8330ee40f98207c6a"],
    dms: ["6045ae91e9181838f0a0a723", "6045ae91e9181838f0a0a723"],
  });

  conversation
    .save()
    .then((result) => {
      console.log("Conversation insert success");
    })
    .catch((error) => {
      console.log(error);
    });
};
