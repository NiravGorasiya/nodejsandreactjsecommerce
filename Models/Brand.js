const mongoose = require("mongoose")

const BrandSchema = new mongoose.Schema({
    brand_name: {
        type: String,
        required: [true, "brand_name required"],
        unique: true
    },
    isDelete: {
        type: String,
        required: false,
        default: false
    },
    status: {
        type: String,
        required: false,
        default: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("brand", BrandSchema)