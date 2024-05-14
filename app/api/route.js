import { NextResponse } from "next/server";

// this code is collecting data from signup or register form
export async function POST(request) {
    try {
        const { email, username, password, confirm_password } = await request.json();
        console.log(email, username, password, confirm_password);
        return NextResponse.json({ message: "User registered" }, { status: 201 });
    } catch (e) {
        return NextResponse.json({ message: "Error Occured during registration" }, { status: 500 });
    }
}
