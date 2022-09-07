const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    category_name: {
        type: String,
        required: [true, "category_name is required"],
        unique: true
    },
    description: {
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

module.exports = mongoose.model("Category", categorySchema)