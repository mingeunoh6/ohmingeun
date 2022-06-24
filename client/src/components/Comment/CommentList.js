import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CommentContent from "./CommentContent";

const CommentList = (props) => {
  const [commentList, setCommentList] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isApiSubscribed = true;

    let body = {
      postId: props.postId,
    };

    axios.post("/api/comment/getComment", body).then((response) => {
      if (response.data.success) {
        setCommentList([...response.data.commentList]);


      }
    }).then(
      setIsLoading(false)

    );

    return () => {
      // cancel the subscription
      isApiSubscribed = false;


    };
  }, []);

  return (
    <div>

      {isLoading ? <h1>loading</h1> :
        <>

          {commentList.map((comment, key) => {
            console.log("list", comment)
            return <CommentContent comment={comment.comment} author={comment.author} key={key} />;
          })}
        </>
      }


    </div>
  );
};

export default CommentList;
