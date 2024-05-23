import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// 1,2,3,4,5,6,7,8,9,0 === uhsbjkfhwe98r349uir438i734t867i4urhgr9

// this code is collecting data from signup or register form
export async function POST(req) {
    try {
        await connectMongoDB();
        const { email, username, password, confirm_password } = await req.json();
        console.log(email, username, password, confirm_password);
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ email, username, password: hashedPassword });
        return NextResponse.json({ message: "User registered" }, { status: 201 });
    } catch (e) {
        return NextResponse.json({ message: "Error Occured during registration" }, { status: 500 });
    }
}
