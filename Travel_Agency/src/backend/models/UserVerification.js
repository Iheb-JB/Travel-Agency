import mongoose from "mongoose";

const userVerificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    uniqueString: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    expiresAt: {
        type: Date,
        required: true,
    }
});

const UserVerification = mongoose.models.UserVerification || mongoose.model("UserVerification", userVerificationSchema);

export default UserVerification;