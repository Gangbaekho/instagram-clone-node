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
    parentReplyId: {
      type: Schema.Types.ObjectId,
      ref: "Reply",
    },
    rereplyIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Reply",
      },
    ],
    rereplyCount: {
      type: Number,
      default: 0,
    },
    content: {
      type: String,
      required: true,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    likeUserIds: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reply", replySchema);
