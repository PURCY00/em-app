import { NextResponse } from "next/server";
import mongoose from "mongoose"; // Adjust the path to your User model
import User from "@/models/user";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function GET(req) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id; // Assuming your session has user.id

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return NextResponse.json({ error: `Invalid userId: ${userId}` }, { status: 400 });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
