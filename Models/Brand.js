const mongoose = require("mongoose")

const BrandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Brand", BrandSchema)