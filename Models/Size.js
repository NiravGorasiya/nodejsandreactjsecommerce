const mongoose = require("mongoose")

const SizeSchema = new mongoose.Schema({
    sizename: {
        type: String,
        required: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Size", SizeSchema)