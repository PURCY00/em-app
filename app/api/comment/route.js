import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectMongoDB } from "@/lib/mongodb";
import Post from "@/models/post";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function handler(req) {
    await connectMongoDB();

    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const authUserId = session.user.id;

    if (req.method === "GET") {
        try {
            const { searchParams } = new URL(req.url);
            const postId = searchParams.get("id");
            if (!postId || !mongoose.Types.ObjectId.isValid(postId)) {
                return NextResponse.json({ error: "Invalid postId" }, { status: 400 });
            }

            const post = await Post.findById(postId).populate({
                path: "comments.author",
                select: "name profilePhoto",
            });

            if (!post) {
                return NextResponse.json({ error: "Post not found" }, { status: 404 });
            }

            const comments = await Promise.all(
                post.comments.map(async (comment) => {
                    const isFollowing = await User.exists({
                        _id: authUserId,
                        following: comment.author._id,
                    });

                    return {
                        ...comment.toObject(),
                        isFollowing: !!isFollowing,
                        authorId: comment.author._id, // Include authorId
                    };
                })
            );

            return NextResponse.json(comments, { status: 200 });
        } catch (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    } else if (req.method === "POST") {
        try {
            const { postId, text } = await req.json();
            const author = session.user.id;

            if (!postId || !mongoose.Types.ObjectId.isValid(postId)) {
                return NextResponse.json({ error: "Invalid postId" }, { status: 400 });
            }

            const newComment = {
                author,
                text,
                timestamp: new Date().toISOString(),
            };

            const post = await Post.findByIdAndUpdate(postId, { $push: { comments: newComment } }, { new: true });

            if (!post) {
                return NextResponse.json({ error: "Post not found" }, { status: 404 });
            }

            await post.populate({
                path: "comments.author",
                select: "name profilePhoto",
            });

            const addedComment = post.comments[post.comments.length - 1];

            return NextResponse.json(
                {
                    ...addedComment.toObject(),
                    authorId: addedComment.author._id, // Include authorId
                },
                { status: 201 }
            );
        } catch (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    } else {
        return NextResponse.json({ error: `Method ${req.method} Not Allowed` }, { status: 405 });
    }
}

export { handler as GET, handler as POST };
