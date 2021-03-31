const mongoose = require("mongoose");
const { TEXT, IMAGE } = require("../constant/messageType");

const Schema = mongoose.Schema;

const dmSchema = new Schema(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    fromId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    toId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    messageType: {
      type: String,
      enum: [TEXT, IMAGE],
      required: true,
    },
    text: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DM", dmSchema);
