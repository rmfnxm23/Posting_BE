const Sequelize = require("sequelize");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(db) {
      // define association here
      db.User.hasMany(db.Post, { foreignKey: "userId" });
    }
  }
  user.init(
    {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING(25),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      nickname: {
        type: Sequelize.STRING(15),
        allowNull: false,
        unique: true,
      },
      name: {
        type: Sequelize.STRING(25),
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING(25),
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "User",
      tableName: "users", // DB의 테이블 이름
    }
  );
  return user;
};
