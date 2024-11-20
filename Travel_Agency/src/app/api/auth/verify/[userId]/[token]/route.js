import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectToMongoDb from "@/uitils/dbConnect";
import User from "@/backend/models/User";
import UserVerification from "@/backend/models/UserVerification";

export async function GET(req, { params }) {
    try {
        await connectToMongoDb();
        
        const { userId, token } = params;
        
        // Find the verification record
        const verificationRecord = await UserVerification.findOne({ userId });
        
        if (!verificationRecord) {
            return NextResponse.json(
                { error: "Invalid verification link" },
                { status: 400 }
            );
        }

        // Check if the link has expired
        if (verificationRecord.expiresAt < Date.now()) {
            await UserVerification.deleteOne({ userId });
            return NextResponse.json(
                { error: "Verification link has expired" },
                { status: 400 }
            );
        }

        // Compare the tokens
        const isValid = await bcrypt.compare(token, verificationRecord.uniqueString);
        if (!isValid) {
            return NextResponse.json(
                { error: "Invalid verification" },
                { status: 400 }
            );
        }

        // Update user verification status
        await User.updateOne({ _id: userId }, { verified: true });
        await UserVerification.deleteOne({ userId });

        return NextResponse.json(
            { message: "Email verified successfully" },
            { status: 200 }
        );

    } catch (error) {
        console.log("Error in email verification:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}