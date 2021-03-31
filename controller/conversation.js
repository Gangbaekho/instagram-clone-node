const Conversation = require("../model/conversation");

exports.createConversation = (req, res, next) => {
  const fromId = req.userId;
  const toId = req.body.toId;

  Conversation.findOne({ talkers: { $all: [fromId, toId] } })
    .then((cs) => {
      if (cs) {
        const error = new Error("already exist conversation.");
        error.statusCode = 500;
        throw error;
      }
      const conversation = new Conversation({ talkers: [fromId, toId] });
      return conversation.save();
    })
    .then((conversation) => {
      res.json({ message: "success", conversation: conversation });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.getConversations = (req, res, next) => {
  const userId = req.userId;

  Conversation.find({ talkers: userId })
    .populate("talkers", "nickName profileImageUrl")
    .then((conversations) => {
      let filteredTalkers = [];

      if (!conversations) {
        return res.json({ message: "success", talkers: filteredTalkers });
      }

      conversations.forEach((conversation) => {
        conversation.talkers.forEach((talker) => {
          if (talker._id.toString() !== userId) {
            filteredTalkers.push(talker);
          }
        });
      });

      res.json({
        message: "success",
        conversations: filteredTalkers,
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};
