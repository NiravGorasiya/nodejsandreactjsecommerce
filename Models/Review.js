const mongoose = require("mongoose")

const ReviewSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Types.ObjectId,
        required: [true, "product_id is required"]
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        required: [true, "user_id is required"]
    },
    rating: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        required: [true, "rating is required"]
    },
    description: {
        type: String,
        required: [true, "description is reqired"]
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Review", ReviewSchema)