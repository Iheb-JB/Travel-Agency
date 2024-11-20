import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
    {
        Id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Reference to the User model
            required: true,
        },
        packageId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "TravelPackage", // Reference to the TravelPackage model
            required: true,
        },
        bookingDate: {
            type: Date,
            default: Date.now,
        },
        status: {
            type: String,
            enum: ["CONFIRMED", "CANCELLED"],
            default: "CONFIRMED",
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        paymentStatus: {
            type: String,
            enum: ["PENDING", "COMPLETED", "REFUNDED"],
            default: "PENDING",
        },
        itinerary: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "TravelComponents", // Reference to TravelComponents model
            },
        ],
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt
);

export default mongoose.model("Booking", BookingSchema);
