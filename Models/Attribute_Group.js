const mongoose = require("mongoose")

const Product_Attribute_Group = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, "name is required"]
    },
    sulg: {
        type: String,
        required: true
    },
    attributes: [
        {
            _id: false,
            attribute_id: {
                type: mongoose.Types.ObjectId,
                ref: "attribute"
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

module.exports = mongoose.model("attiribute_group", Product_Attribute_Group)