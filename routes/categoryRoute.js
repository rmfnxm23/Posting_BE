const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/categoryController");

// 카테고리 가져오기
router.get("/", categoryController.getCategory);

module.exports = router;
