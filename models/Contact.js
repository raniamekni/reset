const mongoose = require("mongoose")

const Contact = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true
    }
})

module.exports = mongoose.model("contact", Contact)