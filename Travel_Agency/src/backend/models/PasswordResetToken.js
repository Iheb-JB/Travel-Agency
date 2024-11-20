import mongoose from "mongoose";

const PasswordResetTokenSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Reference to the User model
            required: true,
        },
        token: {
            type: String,
            required: true,
        },
        expiryDate: {
            type: Date,
            required: true,
        },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

export default mongoose.model("PasswordResetToken", PasswordResetTokenSchema);
