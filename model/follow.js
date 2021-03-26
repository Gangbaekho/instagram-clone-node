const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const followSchema = new Schema({
  follower: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  followee: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

export default mongoose.model("Follow", followSchema);
