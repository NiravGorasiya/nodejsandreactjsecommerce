const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    phone: {
        type: Number,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    userOtp: {
        type: String,
        required: false
    },
    status: {
        type: Boolean,
        default: true
    },
    isDelete: {
        type: String,
        required: false
    }
}, {
    timestamps: false
})

module.exports = mongoose.model("User", userSchema)