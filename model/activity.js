const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const activitySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    feedId: {
      type: Schema.Types.ObjectId,
      ref: "Feed",
    },
    storyId: {
      type: Schema.Types.ObjectId,
      ref: "Story",
    },
    replyId: {
      type: Schema.Types.ObjectId,
      ref: "Reply",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Acitivity", activitySchema);
