import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Detail from "./Detail"
import CommentArea from '../Comment/CommentArea';
import axios from "axios";

const PostArea = () => {

    const [Flag, setFlag] = useState(false);
    const [postInfos, setPostInfos] = useState({});
    let params = useParams();
    useEffect(() => {
        let check = true;
        if (check) {
            let body = {
                postNum: params.postNum,
            }

            axios.post('/api/post/detail', body).then((response) => {
                if (response.data.success) {
                    setPostInfos(response.data.postInfo);
                    setFlag(true)
                }

            }).catch((err) => {
                console.log(err);
            })
        }
        return (() => {
            check = false
        })


    }, [])


    return (
        <div>
            {Flag ? (
                <>
                    <Detail postInfo={postInfos} />
                    <CommentArea postId={postInfos._id} />
                </>
            ) : (
                <div>
                    <h2>Loading</h2>
                </div>
            )}

        </div>
    );
};

export default PostArea;