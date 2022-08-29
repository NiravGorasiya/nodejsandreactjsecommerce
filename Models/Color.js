const mongoose = require("mongoose")

const colorSchema = new mongoose.Schema({
    colorname: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Color", colorSchema)
