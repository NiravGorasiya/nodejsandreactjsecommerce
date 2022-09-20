const mongoose = require("mongoose")

const BrandSchema = new mongoose.Schema({
    brand_name: {
        required: [true, "brand_name required"],
        type: String,
        unique: [true, "The brand name must be unique"],
    },
    slug: {
        type: String,
        required: [true, "sulg is required"]
    },
    description: {
        type: String,
        required: [true, "description is required"]
    },
    brand_logo: {
        type: String
    },
    brand_banner: {
        type: String
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
