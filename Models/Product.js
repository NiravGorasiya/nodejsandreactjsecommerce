const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"]
    },
    stock: {
        type: Boolean,
        required: false
    },
    brand_id: {
        type: mongoose.Types.ObjectId,
        ref: "brand"
    },
    upcomingProduct: {
        type: Boolean,
        default: true
    },
    latestProduct: {
        type: Boolean,
        default: false
    },
    image: {
        type: String,
        require: false
    },
    category_id: [{
        type: mongoose.Types.ObjectId,
        required: [true, "category id is required"],
        ref: "Category"
    }],
    colors_id: {
        type: [mongoose.Types.ObjectId],
        ref: "Color"
    },
    sizes_id: {
        type: [mongoose.Types.ObjectId],
        ref: "Size"
    },
    attributes: [{
        _id: false,
        attributes_id: {
            type: mongoose.Types.ObjectId,
            ref: "attribute",
        },
        attributes_value: [{
            _id: false,
            attribute_value_id: {
                type: mongoose.Types.ObjectId,
                ref: "attribute"
            }
        }]
    }],
    description: {
        type: String,
        required: [true, "description is required"]
    },
    review: [{
        name: {
            type: String,
            required: false
        },
        rating: {
            type: String,
            required: false
        },
        comment: {
            type: String,
            required: false
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User"
        }
    }],
    tax: {
        type: Number,
        required: false
    },
    tax_price: {
        type: String,
        default: "percent",
        enum: ["percent", "amout"],
        lowercase: true
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

module.exports = mongoose.model("Product", productSchema)


