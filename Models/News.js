const mongoose = require("mongoose")

const NewsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "title is required"]
    },
    image: {
        type: String
    },
    rating: {
        type: String
    },
    description: {
        type: String,
        required: [true, "description is required"]
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        required: [true, "user_id is required"]
    },
    comments: [{
        user_id: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true
        },
        text: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model("news", NewsSchema)

