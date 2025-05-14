const Sequelize = require("sequelize");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(db) {
      // define association here
      db.Category.hasMany(db.Post, {
        // 여러개의 post 테이블과 연동
        foreignKey: "categoryId",
        targetKey: "posts",
      });
    }
  }
  category.init(
    {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      category: {
        type: Sequelize.STRING(25),
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "Category",
      tableName: "categories", // DB의 테이블 이름
    }
  );
  return category;
};
