import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        await connectMongoDB();
        const { email, name, password } = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ email, name, password: hashedPassword });
        return NextResponse.json({ message: "User registered" }, { status: 201 });
    } catch (e) {
        return NextResponse.json({ message: "Error Occured during registration" }, { status: 500 });
    }
}
