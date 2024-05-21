import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// this code is collecting data from signup or register form
export async function POST(req) {
    try {
        const { email, username, password, confirm_password } = await req.json();
        console.log(email, username, password, confirm_password);
        const hashedPassword = await bcrypt.hash(password, 10);
        await connectMongoDB();
        await User.create({ email, username, password: hashedPassword });
        return NextResponse.json({ message: "User registered" }, { status: 201 });
    } catch (e) {
        return NextResponse.json({ message: "Error Occured during registration" }, { status: 500 });
    }
}
