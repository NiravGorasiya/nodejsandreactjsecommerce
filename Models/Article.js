const mongoose = require("mongoose")

const AtricleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"]
    },
    image: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: [true, "decription is required"]
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        required: [true, "user id is required"]
    },
    comment: [{
        user_id: {
            type: mongoose.Types.ObjectId
        }
    }, {
        timestamps: true
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model("Atricle", AtricleSchema)

