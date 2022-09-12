const mongoose = require("mongoose")

const TagsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
        unique: true
    },
    slug: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model("Tags", TagsSchema)