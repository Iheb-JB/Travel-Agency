import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema(
    {
        Id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        starRating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        checkInDate: {
            type: Date,
            required: true,
        },
        checkOutDate: {
            type: Date,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Hotel", HotelSchema);