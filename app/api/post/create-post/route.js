import { getServerSession } from "next-auth/next";
import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Post from "@/models/post";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req) {
    try {
        // Get the user session
        const session = await getServerSession(authOptions);
		console.log(session);

        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await connectMongoDB();
        const data = await req.json();
        const { text, images } = data;

        const postData = {
            text: text,
            images: images, // List of URLs from Cloudinary
            user: session.user.id, // Use the user ID from the session
        };

        await Post.create(postData);

        return NextResponse.json(postData, { status: 201 });
    } catch (error) {
        console.error("Error occurred during post creation:", error);
        return NextResponse.json({ message: "Error occurred during post creation" }, { status: 500 });
    }
}
