const { Post } = require("../models");

// 게시글 작성
const postRegister = async (req, res) => {
  try {
    let { title, content, categoryId, userId } = req.body;

    await Post.create({ title, content, categoryId, userId });

    res.json({ message: "등록" });
  } catch (err) {
    console.error(err);
  }
};

// 게시글 전체 조회
const getPosting = async (req, res) => {
  try {
    const postData = await Post.findAll({});

    res.json({ data: postData });
  } catch (err) {
    console.error(err);
  }
};

// 게시글 상세 조회 (id)
const getPostOne = async (req, res) => {
  const { id } = req.params; // Get 요청했을 경우 params

  // console.log(id, "123"); // 16
  // console.log(req.params, "params"); // { id: '16' }
  // console.log(req.params.id, "---------"); // 16

  try {
    // const Postdata = await Post.findOne({ where: { id } });
    const Postdata = await Post.findOne({
      where: { id: req.params.id },
      include: [
        // {
        //   model: "Category",
        //   as: "categoryId",
        //   attributes: ["id", "category"], // select할 컬럼 선택
        // },
      ],
    });

    console.log(Postdata, "Postdata");

    res.json({ data: Postdata });
  } catch (err) {
    console.error(err);
  }
};

// 게시글 수정 (id)
const updatePosting = async (req, res) => {
  try {
    let { title, content, categoryId } = req.body;
    console.log(title, content, categoryId);

    await Post.update(
      { title, content, categoryId },
      {
        where: { id: req.params.id },
      }
    );

    res.json({ message: "수정" });
  } catch (err) {
    console.error(err);
  }
};

// 게시글 삭제 (id)
const deletePosting = async (req, res) => {
  const { id } = req.params;

  console.log(id, "선택한 id");
  console.log(req.params.id, "dddd");
  try {
    const Postdata = await Post.destroy({ where: { id } });
    // const post = await Post.findOne({ where: { id: req.params.id } });
    // console.log(post, "삭제할 데이터");
    // console.log(Postdata, "Postdata");
    // await Postdata.destroy();
    // return;
    // await post.destroy();

    res.status(200).json({ message: "게시글이 삭제되었습니다" });
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  postRegister,
  getPosting,
  getPostOne,
  updatePosting,
  deletePosting,
};
