const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: false
    },
    isDelete: {
        type: Boolean,
        required: false,
        default: false
    },
    status: {
        type: Boolean,
        required: false,
        default: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Categry", categorySchema)