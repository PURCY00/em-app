import { getServerSession } from "next-auth/next";
import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from "@/models/user";
import { isValidObjectId } from "mongoose";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PATCH(req) {
    try {
        // Get the user session
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const userId = session.user.id;

        if (!isValidObjectId(userId)) {
            return NextResponse.json({ message: `Invalid userId: ${userId}` }, { status: 400 });
        }

        await connectMongoDB();

        const data = await req.json();
        const { bio, age, gender, location, job, twitter, linkedIn, profilePhoto } = data;
        console.log(data);

        const updatedFields = {
            age,
            gender,
            location,
            job,
            twitter,
            linkedIn,
            profilePhoto,
            bio,
        };

        Object.keys(updatedFields).forEach((key) => (updatedFields[key] === "" || updatedFields[key] === undefined) && delete updatedFields[key]);

        const updatedUser = await User.findByIdAndUpdate(userId, updatedFields, { new: true });

        if (!updatedUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        if (!updatedUser._id.equals(userId)) {
            return NextResponse.json({ message: "You cannot access this user" }, { status: 401 });
        }

        return NextResponse.json({ message: "User info updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error occurred during user profile update:", error);
        return NextResponse.json({ message: "Error occurred during user profile update" }, { status: 500 });
    }
}
