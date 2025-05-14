const { Post, Category, User } = require("../models");

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
        {
          model: Category, // 데이터를 가져올 모델명
          attributes: ["id", "category"], // 가져올 칼럼 // 카테고리: 카테고리명을 표시하기 위해 불러옴
        },
        {
          model: User,
          as: "user", // 프론트로 데이터를 보낼 때의 쿼리 명으로 사용됨
          // 예를 들어, 프론트의 데이터를 콘솔로 찍어보면 u: {id: 넘버, nickname: "닉네임"} 의 형태.
          // as가 설정되어 있지 않으면 model명이 결과 값의 이름이 된다.
          // 사용시, 관계 정의에서도 설정해야 함.

          attributes: ["id", "nickname"], // 가져올 칼럼 // 작성자: 닉네임으로 표시하기 위해 불러옴
        },
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
