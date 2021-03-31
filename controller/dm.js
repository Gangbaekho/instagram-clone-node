const Conversation = require("../model/conversation");
const DM = require("../model/dm");
const { TEXT, IMAGE } = require("../constant/messageType");

exports.createDmText = (req, res, next) => {
  const fromId = req.userId;
  const toId = req.body.toId;
  const conversationId = req.body.conversationId;
  const text = req.body.text;

  Conversation.findOne({
    _id: conversationId,
    talkers: { $all: [fromId, toId] },
  })
    .then((conversation) => {
      if (!conversation) {
        const error = new Error("invalid conversation");
        error.statusCode = 500;
        throw error;
      }
      const dm = new DM({
        conversationId: conversationId,
        fromId: fromId,
        toId: toId,
        text: text,
        messageType: TEXT,
      });

      return dm.save();
    })
    .then((dm) => {
      res.json({ message: "success", dm: dm });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};
