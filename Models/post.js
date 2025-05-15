const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: ""
  }
}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);
