import React from "react";
import CommentUpload from "./CommentUpload";
import CommentList from "./CommentList";
import { useSelector } from "react-redux";

const CommentArea = (props) => {
  const user = useSelector((state) => state.user);
  return (
    <div>
      <CommentUpload postId={props.postId} />
      <CommentList postId={props.postId} />
    </div>
  );
};

export default CommentArea;
