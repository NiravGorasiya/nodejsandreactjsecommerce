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
    isDelete: {
        type: Boolean,
        default: false
    },
    status: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model("Attiribute_Group", Product_Attribute_Group)