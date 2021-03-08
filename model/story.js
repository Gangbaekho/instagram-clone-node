const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const storySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    contentUrls: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Story", storySchema);
