import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

// this code is collecting data from signup or register form
export async function POST(req) {
    try {
        const { email, password } = await req.json();
        await connectMongoDB();
        return NextResponse.json({ message: "User registered" }, { status: 201 });
    } catch (e) {
        return NextResponse.json({ message: "Error Occured during registration" }, { status: 500 });
    }
}
