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
db.Category = require("./category")(sequelize, Sequelize);
db.Post = require("./post")(sequelize, Sequelize);

console.log(db, "객체니?");

// Object.keys(db).forEach((Post) => {
//   if (db(Post).associate) {
//     db(Post).associate(db);
//   }
// });

// js는 single 스레드라 순차적으로 읽기 때문에 각각의 파일에 관계를 설정할 경우 연결이 제대로 되지 않는다. index에 작성해야 읽을 수 있음.
db.Category.hasMany(db.Post, { foreignKey: "categoryId" });
db.Post.belongsTo(db.Category, { foreignKey: "categoryId" });

db.User.hasMany(db.Post, { foreignKey: "userId", as: "user" });
db.Post.belongsTo(db.User, { foreignKey: "userId", as: "user" });
// as: target 모델의 별명, 이후 include 시 쿼리 결과 값의 이름으로도 사용

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결됨.");
  })
  .catch((err) => {
    console.error(err);
  });

module.exports = db;
