import { connectMongoDB } from "@/lib/mongodb";
import Post from "@/models/post";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await connectMongoDB(); // Connect to MongoDB

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id"); // Extract ID from query parameters

        if (!id) {
            return NextResponse.json({ message: "User ID is required" }, { status: 400 });
        }

        // Fetch posts by the user ID
        const posts = await Post.find({ user: id }).populate("user", "name profilePhoto").lean();

        if (!posts.length) {
            return NextResponse.json({ message: "No posts found for this user" }, { status: 400 });
        }

        return NextResponse.json(posts, { status: 200 });
    } catch (error) {
        console.error("Error fetching posts:", error); // Log the error for debugging
        return NextResponse.json({ message: "Error occurred during fetching post" }, { status: 500 });
    }
}
