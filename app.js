// express 불러오기
const express = require("express"); // Node.js를 사용하여 서버를 구성할 수 있게 만든 클래스와 라이브러리의 집합체 => 웹 애플리케이션을 만들기 위한 프레임 워크

// axios 불러오기
const axios = require("axios");

// cors 불러오기
const cors = require("cors");

const app = express();

const port = 5000;

const userRouter = require("./routes/userRoute");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
