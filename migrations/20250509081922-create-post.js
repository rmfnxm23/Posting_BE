module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("posts", {
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
        type: Sequelize.TEXT("long"), // LONGTEXT : 최대 4294967295 byte (= 대략 4GB)
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
      categoryId: {
        type: Sequelize.INTEGER(11),
      },
      userId: {
        type: Sequelize.INTEGER(11),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("posts");
  },
};
