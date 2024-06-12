const mongoose = require('mongoose');

const CustomerAddressSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'customers' },
    name: { type: String, required: true },
    phone_number: { type: Number, required: true },
    address: { type: String, required: true, default: "" },
    city: { type: String, required: true, default: "" },
    pincode: { type: Number, required: true, default: 0 },
    landmark: { type: String, required: true, default: "" },
    type: { type: String, required: false, default: 'home' }
},
    {
        timestamps: true
    },
);
module.exports = mongoose.model('customer_address', CustomerAddressSchema)