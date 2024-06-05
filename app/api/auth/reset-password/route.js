import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import crypto from "crypto";

export async function POST(req) {
    try {
        await connectMongoDB();

        const { token, newPassword } = await req.json();

        if (!token || !newPassword) {
            return NextResponse.json({ message: "Token and new password are required." }, { status: 400 });
        }

        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
        console.log(token);
        console.log(hashedToken);
        const user = await User.findOne({
            resetToken: hashedToken,
            resetTokenExpiry: { $gt: Date.now() },
        });

        if (!user) {
            return NextResponse.json({ message: "Invalid or expired token." }, { status: 400 });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({ message: "Password updated!" }, { status: 200 });
    } catch (error) {
        console.error("Error updating password:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
