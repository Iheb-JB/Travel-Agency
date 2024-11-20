import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectToMongoDb from "@/uitils/dbConnect";
import User from "@/backend/models/User";

export async function POST(req) {
    try {
        const { firstName, lastName, email, password, confirmPassword } = await req.json();

        // Connect to database
        await connectToMongoDb();

        // Validate input
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            return NextResponse.json(
                { error: "All fields are required!" },
                { status: 400 }
            );
        }

        // Check password match
        if (password !== confirmPassword) {
            return NextResponse.json(
                { error: "Passwords don't match" },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: "Email already exists" },
                { status: 400 }
            );
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            verified: false
        });

        // Send verification 
        await sendVerificationEmail(newUser);

        // Remove password from response
        const user = {
            _id: newUser._id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            verified: newUser.verified
        };

        return NextResponse.json(
            { message: "User registered successfully", user },
            { status: 201 }
        );

    } catch (error) {
        console.log("Error in registration: ", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}