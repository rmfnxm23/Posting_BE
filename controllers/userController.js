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
      return res.json({
        success: false,
        Message: "아이디 또는 비밀번호를 입력해주세요.",
      });
    }

    // console.log(req.body.email, req.body.password);

    const userData = await User.findOne({ where: { email: req.body.email } });
    // console.log(!userData);
    if (!userData) {
      // 배열이 아니라 객체 (findOne)
      return res.json({
        success: false,
        Message: "해당 유저가 존재하지 않습니다.",
      });
    }

    const matchedPass = await bcrypt.compare(password, userData.password); // 입력한 비밀번호화 DB에 저장된 해시비밀번호 비교
    // console.log(matchedPass, "비교해봐");
    if (!matchedPass) {
      return res.json({
        success: false,
        Message: "비밀번호가 일치하지 않습니다.",
      });
    }

    const payload = { id: userData.id, email: userData.email };
    // console.log(payload, "payload");
    // const token = jwt.sign(payload, SecretKey, { expiresIn: "1h" }); //accesstoken
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });
    console.log(accessToken);
    // console.log("token", token);
    const refreshToken = jwt.sign(
      { id: userData.id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    // console.log(refreshToken);

    // 웹 브라우저(클라이언트)에 토큰 세팅
    // res.cookie("accessToken", accessToken);
    // res.cookie("refreshToken", refreshToken);
    res
      // .cookie("refreshToken", refreshToken, {
      //   httpOnly: true,
      //   sameSite: "strict",
      // })
      // .header("Authorization", accessToken)
      // // .send(userData);
      .json({
        token: accessToken,
        Message: "로그인 성공",
        user: userData,
      });

    // return;
    // return res
    //   .status(200)
    //   .json({ data: { accessToken, refreshToken }, Message: "로그인 성공" });
  } catch (err) {
    console.error(err);
  }
};

// 아이디 찾기
const getUserId = async (req, res) => {
  try {
    const { phone } = req.body;

    const userPhone = await User.findOne({ where: { phone } });

    if (!phone) {
      res.send({
        exists: "false",
        Message: "아이디를 찾기 위해 등록된 번호를 입력해주세요.",
      });
    }

    if (userPhone) {
      res.status(200).json({
        // data: { email: userPhone.email, name: userPhone.name },
        userPhone: userPhone,
      });
      console.log(userPhone.email);
    } else {
      res.send({
        exists: "false",
        Message: "일치하는 아이디가 존재하지 않습니다.",
      });
    }
  } catch (err) {
    console.error(err);
  }
};

// 비밀번호 찾기 (이메일 DB조회)
const getUserPw = async (req, res) => {
  try {
    const { email } = req.body;
    // console.log(req.body);

    const userId = await User.findOne({ where: { email: req.body.email } });
    // console.log(userId);
    if (userId) {
      res.status(200).json({
        success: "true",
        // Message: "이메일 일치",
        userId,
      });
    } else {
      res.json({
        success: "false",
        Message: "일치하는 아이디가 존재하지 않습니다.",
      });
    }
  } catch (err) {
    console.error(err);
  }
};

// 비밀번호 변경 (조회된 이메일의 비밀번호)
const updateUserPw = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(req.body, "changepw1");

    const hashPassword = await bcrypt.hash(req.body.password, 12);
    // console.log(hashPassword, "changepw2"); // Promise <pending> => await 사용! => hashing 잘 됨
    const userId = await User.update(
      { password: hashPassword }, // 수정할 데이터
      {
        where: { email: req.body.email }, // 조건
      }
    );
    // console.log(userId, "changepw3");
    if (userId) {
      res.status(200).json({
        success: "true",
        // Message: "이메일 일치",
        userId,
      });
    } else {
      res.json({
        success: "false",
        Message: "비밀번호 변경에 실패하셨습니다.",
      });
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
  userLogin,
  getUserId,
  getUserPw,
  updateUserPw,
};
