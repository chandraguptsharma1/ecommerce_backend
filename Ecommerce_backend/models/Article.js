const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,
  image: String,
  publishedAt: Date,
  source: {
    name: String,
  },
});

module.exports = mongoose.model("Article", ArticleSchema);
