const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const followSchema = new Schema({
  followerId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  followeeId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model("Follow", followSchema);
