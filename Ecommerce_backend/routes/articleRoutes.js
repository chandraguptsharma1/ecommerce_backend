const express = require("express");
const router = express.Router();

const { saveArticle, getArticle } = require("../controllers/newsController");

router.post("/save-article", saveArticle);
router.post("/get-article", getArticle);

module.exports = router;
