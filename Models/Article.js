const mongoose = require("mongoose")

const AtricleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "title is required"]
    },
    image: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: [true, "decription is required"]
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        required: [true, "user id is required"]
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

module.exports = mongoose.model("Atricle", AtricleSchema)

