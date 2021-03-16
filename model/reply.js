const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const replySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userNickName: {
      type: String,
      required: true,
    },
    userProfileImageUrl: {
      type: String,
      required: true,
    },
    feedId: {
      type: Schema.Types.ObjectId,
      ref: "Feed",
    },
    rereplyIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Reply",
      },
    ],
    content: {
      type: String,
      required: true,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reply", replySchema);
