const mongoose = require('mongoose');

const VendorContactSchema = mongoose.Schema({
    name: { type: String, required: false, default: '' },
    phone_number: { type: Number, required: true },
    email: { type: String, required: true, default: "" },
    whatsAppNumber: { type: Number, required: false, default: 0},
    status: { type: Number, required: false, default: 1 },
}, {
    timestamps: true
})
module.exports = mongoose.model('vendor_Contact', VendorContactSchema)