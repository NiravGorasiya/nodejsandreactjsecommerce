const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: false
    },
    lastname: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: [true, "username is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"]
    },
    phone: {
        type: Number,
        required: [true, "phone is required"]
    },
    password: {
        type: String,
        required: [true, '[assword is required']
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