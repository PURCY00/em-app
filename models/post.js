import mongoose, { Schema, models } from "mongoose";

const postSchema = new Schema(
    {
        text: {
            type: String,
            required: true,
        },
        images: {
            type: [String],
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User", // Reference to User model
            required: true,
        },
        comments: {
            type: [
                {
                    author: { type: Schema.Types.ObjectId, ref: "User" },
                    text: String,
                    timestamp: { type: Date, default: Date.now },
                },
            ],
            default: [],
        },
        likes: {
            type: [String],
            default: [],
        },
    },
    { timestamps: true }
);

const Post = models.Post || mongoose.model("Post", postSchema);
export default Post;
