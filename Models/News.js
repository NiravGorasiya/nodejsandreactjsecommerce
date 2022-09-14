const mongoose = require("mongoose")

const NewsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"]
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
    comment: [{
        user_id: {
            type: mongoose.Types.ObjectId
        }
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model("news", NewsSchema)