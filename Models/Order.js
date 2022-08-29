const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Types.ObjectId,
        required: false
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        required: false
    },
    address: {
        type: String,
        required: true
    },
    paymentId: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = OrderSchema