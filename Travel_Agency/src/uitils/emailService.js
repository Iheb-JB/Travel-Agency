import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import UserVerification from "@/src/backend/models/UserVerification";

// Create transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Verify transporter
transporter.verify((error, success) => {
    if (error) {
        console.log("Error with email service:", error);
    } else {
        console.log("Ready to send emails");
    }
});

export const sendVerificationEmail = async (user) => {
    const { _id, email } = user;
    try {
        const uniqueString = uuidv4() + _id;
        const currentUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000/";
        
        // Hash the unique string
        const saltRounds = 10;
        const hashedString = await bcrypt.hash(uniqueString, saltRounds);
        
        // Create verification record
        await UserVerification.create({
            userId: _id,
            uniqueString: hashedString,
            createdAt: Date.now(),
            expiresAt: Date.now() + 14400000, // 4 hours
        });

        // Send email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Verify your email address",
            html: `
                <p>Verify your email address to complete your registration.</p>
                <p>This link expires in <b>4 hours</b>.</p>
                <p>Click <a href="${currentUrl}api/auth/verify/${_id}/${uniqueString}">here</a> to proceed.</p>
            `,
        };

        await transporter.sendMail(mailOptions);
        return { status: "PENDING", message: "Verification email sent" };
        
    } catch (error) {
        console.log("Error sending verification email:", error);
        throw new Error("Failed to send verification email");
    }
};

export const sendPasswordResetEmail = async (user, token) => {
    try {
        const currentUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000/";
        const resetUrl = `${currentUrl}reset-password/${user._id}/${token}`;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Reset your password",
            html: `
                <p>We received a password reset request.</p>
                <p>This link expires in <b>10 minutes</b>.</p>
                <p>Click <a href="${resetUrl}">here</a> to reset your password!</p>
            `,
        };

        await transporter.sendMail(mailOptions);
        return { status: "success", message: "Password reset email sent" };
        
    } catch (error) {
        console.log("Error sending password reset email:", error);
        throw new Error("Failed to send password reset email");
    }
};