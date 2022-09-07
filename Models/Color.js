const mongoose = require("mongoose")

const colorSchema = new mongoose.Schema({
    colorname: {
        type: String
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

module.exports = mongoose.model("Color", colorSchema)
