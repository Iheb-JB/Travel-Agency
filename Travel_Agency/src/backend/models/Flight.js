import mongoose from "mongoose";

const FlightSchema = new mongoose.Schema(
    {
        Id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        airline: {
            type: String,
            required: true,
        },
        departureAirport: {
            type: String,
            required: true,
        },
        arrivalAirport: {
            type: String,
            required: true,
        },
        departureTime: {
            type: Date,
            required: true,
        },
        arrivalTime: {
            type: Date,
            required: true,
        },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

export default mongoose.model("Flight", FlightSchema);