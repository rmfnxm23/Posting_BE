const { User } = require("../models");
const bcrypt = require("bcrypt"); // 암호화 라이브러리
const jwt = require("jsonwebtoken");
// dotenv: 환경 변수 관리를 위한 라이브러리 (보안 목적)
const env = require("dotenv"); // .env 파일에 정의된 값 불러오기
env.config(); // .env 파일 내용을 process.env에 등록
const SecretKey = process.env.JWT_SECRET_KEY; // 등록된 환경 변수 중 변수명에 해당하는 값을 가져옴 (변수명: JWT_SECRET_KEY)

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

// 로그인
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // console.log(SecretKey, "isisisisisisis"); // undefined....why?
    // console.log(process.env.JWT_SECRET_KEY, "????");

    if (!email || !password) {
      return res
        .status(400)
        .json({ Message: "아이디 또는 비밀번호를 입력해주세요." });
    }

    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      // 배열이 아니라 객체 (findOne)
      return res
        .status(400)
        .json({ Message: "해당 유저가 존재하지 않습니다." });
    }

    const matchedPass = await bcrypt.compare(password, userData.password); // 입력한 비밀번호화 DB에 저장된 해시비밀번호 비교
    // console.log(matchedPass, "비교해봐");
    if (!matchedPass) {
      return res.status(400).json({ Message: "비밀번호가 일치하지 않습니다." });
    }

    const payload = { id: userData.id, email: userData.email };
    // console.log(payload, "payload");
    const token = jwt.sign(payload, SecretKey, { expiresIn: "1h" });
    // console.log("token", token);

    // return;
    return res.status(200).json({ token, Message: "로그인 성공" });
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  userRegister,
  userDatadoubleCheck,
  userDatadoubleCheck2,
  userDatadoubleCheck3,
  userLogin,
};
