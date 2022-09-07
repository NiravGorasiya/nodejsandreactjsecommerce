const mongoose = require("mongoose")

const SuppliersSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    contactFname: {
        type: String,
        required: true
    },
    contactLname: {
        type: String,
        required: true
    },
    ContactTitle: {
        type: String,
        required: true
    },
    address1: {
        type: String,
        required: true
    },
    address2: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    fax: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Supplier", SuppliersSchema)