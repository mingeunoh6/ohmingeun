import React, { useState, useEffect, useCallback } from "react";
import useInput from "../../hooks/useInput";
import { useSelector } from "react-redux";
import axios from "axios";

import { Link, useParams, useNavigate } from "react-router-dom";

const CommentUpload = (props) => {
    let params = useParams();
    const user = useSelector((state) => state.user);
    const [comment, onChangeComment, resetComment] = useInput("");

    // const onChangeComment = (e) => {
    //     setComment(e.target.value)
    //     console.log("normal", comment)
    // }

    const onSubmitComment = (e) => {
        e.preventDefault();

        if (!Comment) {
            return alert("댓글에..");
        }
        if (user.uid) {
            let commentBody = {
                uid: user.uid,
                comment: comment,
                postId: props.postId,
            };

            axios
                .post("/api/comment/submit", commentBody)
                .then((response) => {
                    if (response.data.success) {
                        alert("댓글완료작성");
                        resetComment();
                        window.location.reload();
                    } else alert("댓글완료실패");
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            console.log("논 유저");
            alert("로그인이 필요");
        }

        console.log(user);
    };

    return (
        <div>
            <h2>Comment</h2>
            <form onSubmit={onSubmitComment}>
                <label htmlFor="comments">Content</label>
                <textarea
                    id="comments"
                    value={comment || ""}
                    onChange={onChangeComment}
                />
                <button>add</button>
            </form>
        </div>
    );
};

export default CommentUpload;
