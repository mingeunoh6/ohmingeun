const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {

        comment: String,

        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            //ref에는 받아올 스키마 정보.
        },
        postId: {
            type: mongoose.Schema.Types.ObjectId,

        }
    },
    { collection: "comments" }
);

const Comments = mongoose.model("Comments", commentSchema);

module.exports = { Comments };
