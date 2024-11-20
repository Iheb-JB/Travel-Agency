import mongoose from "mongoose";

const TravelComponentSchema = new mongoose.Schema(
    {
        Id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

export default mongoose.model("TravelComponent", TravelComponentSchema);
