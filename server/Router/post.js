const express = require("express");
const router = express.Router();
const multer = require("multer");

const { Post } = require("../Model/Post.js");
const { Counter } = require("../Model/Counter.js");
const { User } = require("../Model/User.js");
const { Comments } = require("../Model/Comments.js")

const setUpload = require("../util/upload");

router.post("/submit", (req, res) => {
  let temp = {
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
    uid: req.body.uid,
  };

  //글에 고유한 카운터를 부여하기 위함
  Counter.findOne({ name: "counter" })
    .exec()
    .then((count) => {
      temp.postNum = count.postNum;
      //글에 작성자 정보를 담기 위함

      User.findOne({ uid: temp.uid })
        .exec()
        .then((userInfo) => {
          console.log(userInfo);
          temp.author = userInfo._id;

          //글에 글 정보를 담기 위함
          const CommunityPost = new Post(temp);
          CommunityPost.save().then((doc) => {
            Counter.updateOne(
              { name: "counter" },
              { $inc: { postNum: 1 } }
            ).then(() => {
              res.status(200).json({ success: true });
            });
          });
        });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});

router.post("/list", (req, res) => {
  Post.find()
    .populate("author") //만약 오브젝트 아이디를 가진 데이터가 있다면 그 녀석이 속한 데이터베이스에서 모든 정보를 가져와서 다시 하위 데이터베이스에 합쳐준다
    .exec()
    .then((doc) => {
      res.status(200).json({ success: true, postList: doc });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});

router.post("/detail", (req, res) => {
  let findPostNumb = req.body.postNum;

  Post.findOne({ postNum: findPostNumb })
    .populate("author")
    .exec()
    .then((post) => {
      res.status(200).json({ success: true, postInfo: post });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});

router.post("/edit", (req, res) => {
  let findPostNumb = req.body.postNum;
  let editedPost = {
    title: req.body.title,
    content: req.body.content,
  };

  Post.updateOne({ postNum: findPostNumb }, { $set: editedPost })
    .exec()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});

router.post("/delete", (req, res) => {
  console.log(req.body);
  Post.deleteOne({ postNum: Number(req.body.postNum) })
    .exec()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});

//``````````````````````````````imageUpload``````````````````````````````````````````````??

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "image/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname + "-" + Date.now());
//   },
// });

// const upload = multer({ storage: storage }).single("file");

// router.post("/image/upload", (req, res) => {
//   upload(req, res, (err) => {
//     if (err) {
//       res.status(400).json({ success: false });
//     } else {
//       res.status(200).json({ success: true, filePath: res.req.file.path });
//     }
//   });
// });

router.post(
  "/image/upload",
  setUpload("omg-no1/image/imageTest"),
  (req, res, next) => {
    console.log(res.req);
    res.status(200).json({ success: true, filePath: res.req.file.location });
  }
);


module.exports = router;

