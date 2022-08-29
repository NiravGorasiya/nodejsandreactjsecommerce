const mongoose = require("mongoose")

const productAttribute = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    attribute: [
        {
            name: {
                type: String,
                required: false
            },
            value: {
                type: String,
                required: false
            }
        },
    ]
}, {
    timestamps: true
})

module.exports = mongoose.model("Product_Attribute", productAttribute)