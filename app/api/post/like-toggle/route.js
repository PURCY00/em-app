import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { connectMongoDB } from "@/lib/mongodb";
import Post from "@/models/post";

export async function POST(req) {
    await connectMongoDB();

    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const { postId } = await req.json();

    if (!postId) {
        return NextResponse.json({ error: "Missing postId" }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(postId)) {
        return NextResponse.json({ error: "Invalid userId or postId" }, { status: 400 });
    }

    try {
        const post = await Post.findById(postId);

        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        const isLiked = post.likes.includes(userId);

        if (isLiked) {
            post.likes = post.likes.filter((id) => id.toString() !== userId);
            await post.save();
            return NextResponse.json({ message: "Post unliked successfully" }, { status: 200 });
        } else {
            post.likes.push(userId);
            await post.save();
            return NextResponse.json({ message: "Post liked successfully" }, { status: 200 });
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
