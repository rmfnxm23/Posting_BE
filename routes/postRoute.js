const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");

// 게시글 등록
router.post("/register", postController.postRegister);

// 게시글 전체 조회
router.get("/postAll", postController.getPosting);

// 게시글 상세 조회 (id)
router.get("/detail/:id", postController.getPostOne);

// 게시글 수정 (id) => 업데이트
router.post("/update/:id", postController.updatePosting);

// 게시글 삭제 (id)
router.delete("/delete/:id", postController.deletePosting);

module.exports = router;
