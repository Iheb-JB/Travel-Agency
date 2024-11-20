import mongoose from "mongoose";

const CarRentalSchema = new mongoose.Schema(
    {
        company: {
            type: String,
            required: true,
        },
        carModel: {
            type: String,
            required: true,
        },
        pickUpLocation: {
            type: String,
            required: true,
        },
        dropOffLocation: {
            type: String,
            required: true,
        },
        pickUpDate: {
            type: Date,
            required: true,
        },
        dropOffDate: {
            type: Date,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("CarRental", CarRentalSchema);