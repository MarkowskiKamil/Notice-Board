const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema({
  title: String,
  description: String,
  author: {
    ref: "Users",
    type: mongoose.Schema.Types.ObjectId,
  },
  category: [String],
  tags: Array,
  price: Number,
  created: Date,
});

module.exports = mongoose.model("Notice", noticeSchema);


