import mongoose, { Schema, models } from "mongoose";

const commentSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        postId: {
            type: String,
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },
        likes: {
            type: [String],
            default: [],
        },
        likeCount: {
            type: Number,
            default: 0,
        },
    },

    {
        timestamps: true,
    }
);

const Comment = models.Comments || mongoose.model("Comments", commentSchema);
export default Comment;
