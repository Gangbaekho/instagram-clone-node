const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const feedSchema = new Schema(
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
    replyIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Reply",
      },
    ],
    content: {
      type: String,
      default: "",
    },
    contentUrls: {
      type: [String],
      default: [],
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
    replyCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feed", feedSchema);
