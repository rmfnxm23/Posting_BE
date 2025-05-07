// express 불러오기
const express = require("express"); // Node.js를 사용하여 서버를 구성할 수 있게 만든 클래스와 라이브러리의 집합체 => 웹 애플리케이션을 만들기 위한 프레임 워크

// axios 불러오기
const axios = require("axios");

// cors 불러오기
const cors = require("cors"); // Cross Origin Resource Sharing의 약자로서 포트 번호, 도메인 주소 등이 다를 때 보안 상의 이유로 api 호출을 차단하는 것

const app = express();

const port = 5000;

const userRouter = require("./routes/userRoute");

// 브라우저에서 다른 도메인의 서버로 요청할대만 cors발생
// app.use(cors()); // -> 모든 요청에 다
// res.setHeader("Access-Control-Allow-Origin", "*") 설정 넣어주는 것
app.use(
  cors({
    origin: true, // 프론트 서버 주소 명시
    credentials: true, // 기본값 false // 사용자 인증이 필요한 리소스 접근이 필요한 경우 true를 설정해야 함
  })
);

app.use(express.json()); // JSON 형태의 데이터 전달
app.use(express.urlencoded({ extended: false })); // URL-encoded 형식의 데이터 전달 (주로 form 데이터)
// extended: true → 중첩 객체 가능 (qs 사용: 설치 필요)
// extended: false → 단순 key-value만 가능 (querystring 사용)

// (중요) express.json()과 express.urlencoded()가 route를 설정 코드 위에 있어야 함
app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
