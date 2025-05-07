const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

// 회원등록
router.post("/register", userController.userRegister);

// 중복검사 (이메일, 닉네임, 전화번호)
router.post("/check/email", userController.userDatadoubleCheck);
router.post("/check/nickname", userController.userDatadoubleCheck2);
router.post("/check/phone", userController.userDatadoubleCheck3);

// 로그인
router.post("/login", userController.userLogin);

// 아이디 찾기
router.post("/find/id", userController.getUserId);

// 비밀번호 찾기
router.post("/find/pw", userController.getUserPw);

// 비밀번호 변경
router.put("/change/pw", userController.updateUserPw);

module.exports = router;
