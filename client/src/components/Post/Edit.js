import React, { useEffect, useState } from "react";
import { Form } from "../../style/Poststyle";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ImageUpload from "./ImageUpload";

const Edit = () => {
  const [postInfo, setPostInfo] = useState({});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState();

  let params = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .post("/api/post/detail", params)
      .then((response) => {
        response.data.success
          ? (function () {
              setPostInfo(response.data.postInfo);
            })()
          : (function () {
              console.log("bad");
            })();
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setTitle(postInfo.title);
    setContent(postInfo.content);
  }, [postInfo]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (title === "" || content === "") {
      return alert("empty!");
    }

    let body = {
      title: title,
      content: content,

      postNum: params.postNum,
    };

    axios
      .post("/api/post/edit", body)
      .then((response) => {
        if (response.data.success) {
          alert("글 수정 완료");
          navigate(`/post/${params.postNum}`);
        } else {
          alert("글 수정 실패하였습니다");
        }
      })
      .catch((err) => console.log(err));
  };

  const titleChange = (e) => {
    setTitle(e.target.value);
  };

  const contentChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <div>
      <h2>Edit</h2>

      <div>
        <Form onSubmit={onSubmit}>
          <label htmlFor="title">Title</label>
          <input id="title" value={title || ""} onChange={titleChange} />

          <label htmlFor="Content">Content</label>
          <textarea
            id="Content"
            value={content || ""}
            onChange={contentChange}
          />
          <button
            onClick={(e) => {
              onSubmit(e);
            }}
          >
            Submit
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            Cancle
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Edit;
