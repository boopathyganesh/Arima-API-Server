const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({
    otp: { type: Number },
    country_code: { type: String, required: false },
    phone_number: { type: Number, required: false },
    userName: { type: String, required: true, default: "" },
    email: { type: String, required: true, default: "" },
    password: { type: String, required: false, default: "" },
    image: { type: String, required: false, default: "" },
    gender: { type: String, required: false, default: "" },
    customerId: { type: String, required: true },
    status: { type: Number, default: 1 },
    totalOrder: { type: Number, default: 0 },
    type: { type: String, required: false },

    //address details
    address_type: { type: String, required: false, default: "Home" },
    address: { type: String, required: false, default: "" },
    area_zone: { type: String, required: false, default: "" },
    landmark: { type: String, required: false, default: "" },
    deactive: { type: Number, required: false, default: 0 },
    deactiveAt: { type: Date, default: Date.now() },
    device_id: { type: String, required: false, default: "" },
    resetPasswordToken: { type: String, required: false, default: "" },
    resetPasswordExpires: { type: Date, default: Date.now() },

},
    {
        collection: 'customers',
        timestamps: true
    }
)
CustomerSchema.index({ "location": "2dsphere" });
module.exports = mongoose.model('customers', CustomerSchema)