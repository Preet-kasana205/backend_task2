const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String, // just store name for now
});

module.exports = mongoose.model("Post", postSchema);
