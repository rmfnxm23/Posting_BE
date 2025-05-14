const Sequelize = require("sequelize");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(db) {
      // define association here
      // db.Post.belongTo(db.Category, {
      //   // 하나의 category 테이블과 연동
      //   // foreignKey: "posts",
      //   foreignKey: "categoryId",
      //   // sourceKey: "id",
      //   // onDelete: "cascade",
      //   // onUpdate: "cascade",
      // });
      // db.Post.belongTo(db.User, { foreignKey: "userId" });
    }
  }
  post.init(
    {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT("long"), // LONGTEXT
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        // defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        // defaultValue: Sequelize.literal(
        //   "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        // ),
      },
      // 외래 키 컬럼을 추가, references:{}로 관계 정의
      categoryId: {
        // foreignKey
        type: Sequelize.INTEGER(11),
        references: {
          model: "Category", // model: 참조하는 테이블 정의
          key: "id", // model: 참조하는 테이블 정의
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      userId: {
        // foreignKey
        type: Sequelize.INTEGER(11),
        references: {
          model: "User",
          key: "id",
        },
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "Post", // Model의 이름 설정
      tableName: "posts", // DB의 테이블 이름
    }
  );
  return post;
};
