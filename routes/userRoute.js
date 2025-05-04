const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

// 회원등록
router.post("/register", userController.userRegister);

// 중복검사 (이메일, 닉네임, 전화번호)
router.post("/check/email", userController.userDatadoubleCheck);
router.post("/check/nickname", userController.userDatadoubleCheck2);
router.post("/check/phone", userController.userDatadoubleCheck3);

module.exports = router;
