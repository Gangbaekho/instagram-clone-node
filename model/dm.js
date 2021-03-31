const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const dmSchema = new Schema(
  {
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
    message: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DM", dmSchema);
