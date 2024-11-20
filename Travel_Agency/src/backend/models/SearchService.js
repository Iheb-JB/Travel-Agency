import mongoose from "mongoose";

const SearchServiceSchema = new mongoose.Schema(
    {
        criteria: {
            type: Map, // Dynamic object for storing search filters
            of: String,
            required: true,
        },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

export default mongoose.model("SearchService", SearchServiceSchema);
