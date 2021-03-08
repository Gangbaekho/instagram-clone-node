const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const dmSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DM", dmSchema);
