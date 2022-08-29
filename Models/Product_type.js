const mongoose = require("mongoose")

const ProductTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Product_type", ProductTypeSchema)