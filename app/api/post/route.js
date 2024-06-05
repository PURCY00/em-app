import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Post from "@/models/post";

// GET /api/posts
export async function GET(req) {
    try {
        await connectMongoDB();
        const posts = await Post.find({}).populate("user", "name profilePhoto").lean();

        return NextResponse.json(posts, { status: 200 });
    } catch (error) {
        console.error("Error occurred during fetching posts:", error);
        return NextResponse.json({ message: "Error occurred during fetching posts" }, { status: 500 });
    }
}
