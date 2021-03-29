const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const activitySchema = new Schema(
  {
    whoId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    whomId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      requred: true,
    },
    feedId: {
      type: Schema.Types.ObjectId,
      ref: "Feed",
    },
    replyId: {
      type: Schema.Types.ObjectId,
      ref: "Reply",
    },
    activityType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

activitySchema.index({ createdAt: 1 });

module.exports = mongoose.model("Acitivity", activitySchema);
