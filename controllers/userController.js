const { User } = require("../models");
const bcrypt = require("bcrypt"); // 암호화 라이브러리

// 회원가입
const userRegister = async (req, res) => {
  try {
    let { email, password, nickname, name, phone } = req.body;
    // console.log(req.body);
    // console.log(email);
    // return;

    // const salt = bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, 12);

    await User.create({ email, password: hashPassword, nickname, name, phone });

    res.status(201).json({ message: "회원가입 성공" });
  } catch (err) {
    console.error(err);
  }
};

// 중복확인 (이메일)
const userDatadoubleCheck = async (req, res) => {
  console.log(req.body, "---------=-=-");
  console.log(req.body.email, "12312312312698413468");
  try {
    const email = req.body.email;

    const existData = await User.findOne({ where: { email } });

    console.log(res, "back");
    if (!existData) {
      res.json({ Message: "사용 가능한 이메일입니다." });
    } else {
      res.json({ exist: "true", Message: "이미 사용된 이메일입니다." });
    }
  } catch (err) {
    console.error(err);
  }
};

// 중복확인 (닉네임)
const userDatadoubleCheck2 = async (req, res) => {
  try {
    const nickname = req.body.nickname;

    const existData = await User.findOne({ where: { nickname } });

    console.log(res, "back");

    if (!existData) {
      res.json({ Message: "사용 가능한 닉네임입니다." });
    } else {
      res.json({ exist: "true", Message: "이미 사용된 닉네임입니다." });
    }
  } catch (err) {
    console.error(err);
  }
};

// 중복확인 (전화번호)
const userDatadoubleCheck3 = async (req, res) => {
  try {
    const phone = req.body.phone;

    const existData = await User.findOne({ where: { phone } });

    if (!existData) {
      res.json({ Message: "사용 가능한 번호입니다." });
    } else {
      res.json({ exist: "true", Message: "이미 사용된 번호입니다." });
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  userRegister,
  userDatadoubleCheck,
  userDatadoubleCheck2,
  userDatadoubleCheck3,
};
