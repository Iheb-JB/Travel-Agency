import { NextResponse } from "next/server";
import crypto from "crypto";
import connectToMongoDb from "@/src/utils/dbConnect";
import User from "@/src/backend/models/User";
import Token from "@/src/backend/models/Token";
import { sendPasswordResetEmail } from "@/src/utils/emailService";

export async function POST(req) {
    try {
        const { email } = await req.json();
        await connectToMongoDb();

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { error: "User with given email doesn't exist" },
                { status: 400 }
            );
        }

        // Create or get reset token
        let resetToken = await Token.findOne({ userId: user._id });
        if (!resetToken) {
            resetToken = await Token.create({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            });
        }

        // Send password reset email
        await sendPasswordResetEmail(user, resetToken.token);

        return NextResponse.json({
            status: "success",
            message: "Password reset link sent to your email",
        });

    } catch (error) {
        console.log("Error in password reset:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}