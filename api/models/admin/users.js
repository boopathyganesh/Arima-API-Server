const mongoose = require('mongoose');

const AdminUsersSchema = mongoose.Schema({
    //personal details
    user_id: { type: Number, required: false, default: 0 },
    country_code: { type: String, required: false, default: "+91" },
    phone_number: { type: String, required: true, unique: true },
    name: { type: String, required: true, default: "" },
    lastname: { type: String, required: false, default: "" },
    email: { type: String, required: true, default: "" },
    image: { type: String, required: false, default: "" },
    gender: { type: String, required: false, default: "" },
    password: { type: String, required: false, default: "" },
    //ofc details-

    department: { type: String, required: false, default: "" },
    designation: { type: String, required: false, default: "" },
    //address details
    address: { type: String, required: false, default: "" },
    area_zone: { type: String, required: false, default: "" },


    deactive: { type: Number, required: false, default: 0 },
    deactiveAt: { type: Date, default: Date.now() },
    device_id: { type: String, required: false, default: "" },

}, {
    collection: 'admin_users',
    timestamps: true
})
module.exports = mongoose.model('admin_users', AdminUsersSchema)