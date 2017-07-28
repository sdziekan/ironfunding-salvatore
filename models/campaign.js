const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TYPES = require("./campaign-types");

const campaignSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: TYPES,
    required: true
  },
  _creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  goal: {
    type: Number,
    required: true
  },
  backerCount: {
    type: Number,
    default: 0
  },
  totalPledged: {
    type: Number,
    default: 0
  },
  deadline: {
    type: Date,
    required: true
  }
});

campaignSchema.virtual("timeRemaining").get(function() {
  let remaining = moment(this.deadline).fromNow(true).split(" ");
  let [days, unit] = remaining;
  return { days, unit };
});

campaignSchema.virtual("inputFormattedDate").get(function() {
  return moment(this.deadline).format("YYYY-MM-DD");
});

campaignSchema.methods.belongsTo = function(user) {
  return this._creator.equals(user._id);
};

module.exports = mongoose.model("Campaign", campaignSchema);
