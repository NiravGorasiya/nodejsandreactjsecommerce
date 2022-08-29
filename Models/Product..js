const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    brand_id: {
        type: mongoose.Types.ObjectId,
        ref: "Brand"
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
    category_id: {
        type: mongoose.Types.ObjectId,
        required: false
    },
    colors_id: {
        type: [mongoose.Types.ObjectId],
        ref: "Color"
    },
    sizes_id: {
        type: [mongoose.Types.ObjectId],
        ref: "Size"
    },
    attributed: [{
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
    }],
    description: {
        type: String,
        required: false
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
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Product", productSchema)