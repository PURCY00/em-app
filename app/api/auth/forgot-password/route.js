import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import crypto from "crypto";
import sendMail from "@/utils/mailer";

export async function POST(request) {
    const { email } = await request.json();

    try {
        await connectMongoDB();
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return NextResponse.json({ message: "Email doesn't exist." }, { status: 400 });
        }

        const resetToken = crypto.randomBytes(20).toString("hex");
        const passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
        const passwordResetExpires = Date.now() + 3600000; // 1 hour expiry

        existingUser.resetToken = passwordResetToken;
        existingUser.resetTokenExpiry = passwordResetExpires;
        await existingUser.save(); // Ensure you save the user after updating the fields

        const resetUrl = `${process.env.NEXTAUTH_BASEURL}/auth/reset-password/${resetToken}`;
        const body = `
            <html>
            <head>
                <style>
                    .container { font-family: Arial, sans-serif; width: 100%; padding: 20px; box-sizing: border-box; background-color: #f9f9f9; }
                    .content { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border: 1px solid #dddddd; border-radius: 5px; }
                    .header { text-align: center; padding-bottom: 20px; border-bottom: 1px solid #dddddd; }
                    .header h1 { color: #333333; }
                    .body { margin-top: 20px; }
                    .body p { color: #555555; }
                    .button { display: block; width: 200px; margin: 20px auto; padding: 10px; text-align: center; background-color: #007bff; text-decoration: none; color: #ffffff !important; border-radius: 5px; }
                    .footer { margin-top: 20px; text-align: center; color: #999999; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="content">
                        <div class="header">
                            <h1>Password Reset Request</h1>
                        </div>
                        <div class="body">
                            <p>Hi there,</p>
                            <p>We received a request to reset your password. Click the button below to reset it:</p>
                            <a href="${resetUrl}" class="button">Reset Password</a>
                            <p>If you didn't request a password reset, please ignore this email or contact support if you have any questions.</p>
                            <p>Thanks,<br>The emApp Team</p>
                        </div>
                        <div class="footer">
                            <p>&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `;

        const msg = {
            to: email,
            subject: `EmApp Reset Password`,
            html: body,
        };

        const emailStatus = await sendMail(msg);

        if (!emailStatus.success) {
            return NextResponse.json({ message: "Something went wrong! Verification message not sent." }, { status: 500 });
        }

        return NextResponse.json({ message: "Recovery password link sent to your email." }, { status: 200 });
    } catch (error) {
        console.error("Error during password reset request:", error);
        return NextResponse.json({ message: "An error occurred during the password reset process." }, { status: 500 });
    }
}
