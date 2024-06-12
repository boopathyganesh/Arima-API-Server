const mongoose = require('mongoose')
const moment = require('moment');

const date_now = Date.now();
const end_date = moment(date_now).add(30, 'days').format('YYYY-MM-DD');

const VendorShopsSchema = mongoose.Schema({
    //Owner details
    name: { type: String, required: true, default: '' },
    otp: { type: Number },
    email: { type: String, required: true, default: "" },
    phone_number: { type: Number, required: true, unique: true },
    gender: { type: String, required: false, default: "" },
    owner_address: { type: String, required: false, default: "" },
    // user_id: { type: String, required: false, default: 0 },
    image: { type: String, required: false, default: "" },
    country_code: { type: String, required: false, default: '91' },
    deactive: { type: Number, required: false, default: 0 },
    deactiveAt: { type: Date, default: Date.now() },


    //Shop details
    shop_id: { type: String, required: true, default: "" },
    shop_name: { type: String, required: false, default: "" },
    shop_mobile_number: { type: Number, required: false, default: 0 },
    open_time: { type: String, required: false, default: "" },
    close_time: { type: String, required: false, default: "" },
    holiday: { type: String, required: false, default: "" },
    shop_address: { type: String, required: false, default: "" },
    shop_description: { type: String, required: false, default: "" },
    shop_image: { type: String, required: false, default: "" },
    shop_info: { type: Boolean, required: false, default: false },


    //Document details
    is_gst: { type: Boolean, required: false, default: false },
    gst_number: { type: String, required: false, default: "" },
    aadhaar_number: { type: Number, required: false, default: "" },
    pan_number: { type: String, required: false, default: "" },
    aadhaar_image: { type: String, required: false, default: "" },
    pan_image: { type: String, required: false, default: "" },



    //Nominee details
    nominee_name: { type: String, required: false, default: "" },
    nominee_relationship: { type: String, required: false, default: "" },
    nominee_mobile_number: { type: Number, required: false, default: "" },
    nominee_gender: { type: String, required: false, default: "" },
    nominee_address: { type: String, required: false, default: "" },

    //Bank details
    account_holder_name: { type: String, required: false, default: "" },
    bank_name: { type: String, required: false, default: "" },
    account_number: { type: Number, required: false, default: "" },
    ifsc_code: { type: String, required: false, default: "" },
    upi_id: { type: String, required: false, default: "" },

    personal_info: { type: Boolean, required: false, default: false },
    shop_info: { type: Boolean, required: false, default: false },
    document_info: { type: Boolean, required: false, default: false },
    nominee_info: { type: Boolean, required: false, default: false },
    bank_info: { type: Boolean, required: false, default: false },
    plan_info: { type: Boolean, required: false, default: false },

    status: { type: Number, required: false, default: 1 },
    shop_status: { type: String, required: false, default: "PENDING" },

    selected_plan_id: { type: String, required: false, default: "" },
    selected_plan_name: { type: String, required: false, default: "Free Plan" },
    subscribe_end_date: { type: Date, required: false, default: end_date }
},
    { collection: 'vendors', timestamps: true })
VendorShopsSchema.index({ "location": "2dsphere" });
module.exports = mongoose.model('vendors', VendorShopsSchema)