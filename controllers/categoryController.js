const { Category } = require("../models");

// 카테고리 가져오기
const getCategory = async (req, res) => {
  try {
    const cateData = await Category.findAll({});
    console.log(cateData);
    // return;
    res.json({ data: cateData });
  } catch (err) {
    console.error(err);
  }
};

module.exports = { getCategory };
