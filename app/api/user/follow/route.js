import { NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { connectMongoDB } from "@/lib/mongodb";

export async function POST(req) {
    await connectMongoDB();

    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const { followId } = await req.json();

    if (!followId) {
        return NextResponse.json({ error: "Missing followId" }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(followId)) {
        return NextResponse.json({ error: "Invalid userId or followId" }, { status: 400 });
    }

    try {
        const user = await User.findById(userId);
        const followUser = await User.findById(followId);

        if (!user || !followUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        if (user.following.includes(followId)) {
            // Unfollow the user
            user.following = user.following.filter((id) => id.toString() !== followId);
            followUser.followers = followUser.followers.filter((id) => id.toString() !== userId);

            await user.save();
            await followUser.save();

            return NextResponse.json({ message: "Unfollowed successfully" }, { status: 200 });
        } else {
            // Follow the user
            user.following.push(followId);
            followUser.followers.push(userId);

            await user.save();
            await followUser.save();

            return NextResponse.json({ message: "Followed successfully" }, { status: 200 });
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
