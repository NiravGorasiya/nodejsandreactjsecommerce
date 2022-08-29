const mongoose = require("mongoose")

const ProductArrtibuteValueSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Types.ObjectId,
    },
    product_attribute_id: {
        type: mongoose.Types.ObjectId
    },
    name: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Product_Attribute_Value", ProductArrtibuteValueSchema)