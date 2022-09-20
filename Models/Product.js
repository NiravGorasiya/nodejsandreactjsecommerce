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
        required: [true, "brand id is required"],
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
        type: Array,
        require: false
    },
    category_id: [{
        type: mongoose.Types.ObjectId,
        required: [true, "category id is required"],
        ref: "Category"
    }],
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
    tags: [{
        type: mongoose.Types.ObjectId,
        required: false
    }],
    description: {
        type: String,
        required: [true, "description is required"]
    },
    reviews: [{
        user_id: {
            type: mongoose.Types.ObjectId,
            required: [true, "user_id is required"]
        },
        rating: {
            type: Number,
            enum: [1, 2, 3, 4, 5],
            required: [true, "rating is required"]
        },
        description: {
            type: String,
            required: [true, "description is reqired"]
        }
    }],
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


