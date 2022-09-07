const mongoose = require("mongoose")

const SizeSchema = new mongoose.Schema({
    sizename: {
        type: String,
        required: false
    },
    isDelete: {
        type: Boolean,
        default: false
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Size", SizeSchema)