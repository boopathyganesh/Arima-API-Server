const mongoose = require('mongoose');

const ManagerSchema = mongoose.Schema({
    name: { type: String, required: false, default: '' },
    gender: { type: String, required: false, default: "" },
    phone_number: { type: Number, required: true },
    email: { type: String, required: true, default: "" },
    image: { type: String, required: false, default: "" },
    status: { type: Number, required: false, default: 1 },
    assignedShops: { type: Number, required: false, default: 0 }
}, {
    timestamps: true
})
module.exports = mongoose.model('manager', ManagerSchema)