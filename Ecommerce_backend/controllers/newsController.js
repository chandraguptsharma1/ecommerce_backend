const Article = require("../models/Article"); // adjust the path as needed

exports.saveArticle = async (req, res) => {
  try {
    const articleData = req.body;

    const newArticle = new Article(articleData);
    const result = await newArticle.save();

    res.status(200).json({
      status: 200,
      msg: "Successfully saved article",
      data: result,
    });
  } catch (err) {
    console.error("Save article error:", err.message);
    res.status(500).json({
      status: 500,
      msg: "Failed to save article",
      data: null,
    });
  }
};

exports.getArticle = async (req, res) => {
  try {
    const article = await Article.find().sort({ publishedAt: -1 });
    res.status(200).json({
      status: 200,
      msg: "Article fetched successfully",
      data: article,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      msg: "Failed to fetch articles",
      data: null,
    });
  }
};
