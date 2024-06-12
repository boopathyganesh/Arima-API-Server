const mongoose = require('mongoose');


const CustomerSchema = mongoose.Schema({
    bannerImage: { type: String, required: true },
    heading: { type: String, required: true, default: "" },
    description: { type: String, required: true, default: "" }
},
    {
        timestamps: true
    },
);
module.exports = mongoose.model('customer_banner', CustomerSchema)