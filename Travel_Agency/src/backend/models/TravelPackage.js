import mongoose from "mongoose";

const TravelPackageSchema = new mongoose.Schema(
    {
        Id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        destinations: [
            {
                type: String, // List of strings for destinations
            },
        ],
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        availableSlots: {
            type: Number,
            required: true,
        },
        components: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "TravelComponent", // References the TravelComponent model
            },
        ],
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

export default mongoose.model("TravelPackage", TravelPackageSchema);
