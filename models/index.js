const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
// const config = require(__dirname + "/../config/config.json")[env];
const config = require("../config/config.json")[env];

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// db.User = require("./user");
db.User = require("./user")(sequelize, Sequelize); // sequelize 인스턴스 Sequelize 클래스를 불러와야 User의 함수를 사용할 수 있다.

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결됨.");
  })
  .catch((err) => {
    console.error(err);
  });

module.exports = db;
