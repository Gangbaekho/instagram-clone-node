const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const conversationSchema = new Schema(
  {
    talkers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    dms: [
      {
        type: Schema.Types.ObjectId,
        ref: "DM",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", conversationSchema);
