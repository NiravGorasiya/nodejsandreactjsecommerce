const mongoose = require("mongoose")

const productAttribute = new mongoose.Schema({
    product_group_id: {
        type: mongoose.Types.ObjectId,
        required: false,
        ref: "Product_Attiribute_Group",
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    value: [
        {
            name: {
                type: String,
                required: true,
                trim: true
            },
            slug: {
                type: String,
                required: true,
                trim: true
            },
            description: {
                type: String,
                required: true,
                trim: true
            }
        }
    ],
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

module.exports = mongoose.model("attribute", productAttribute)