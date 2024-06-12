const mongoose = require('mongoose');


const Couponschema = mongoose.Schema({
    product_category: { type: mongoose.Schema.Types.ObjectId, ref: 'product_category' },//product,food,services
    shop_category: { type: mongoose.Schema.Types.ObjectId, ref: 'vendors' },//grocery,electric,sports,others
    title: { type: String, required: true, default: "" },
    type: { type: String, required: false, default: "" },
    shop: { type: String, required: false, default: "" },
    code: { type: String, required: false, default: "" },
    limit: { type: Number, required: false, default: 0 },
    start_date: { type: Date, default: Date.now() },
    expiry_date: { type: Date, default: Date.now() },
    discount_type: { type: String, default: "" },
    discount: { type: String, default: "" },
    min_discount: { type: Number, default: 0 },
    max_discount: { type: Number, default: 0 },

    remark: { type: String, required: false, default: "" },
    is_active: { type: Boolean, required: true, default: true },

    status: { type: Number, required: true, default: 0 }
},
    {
        timestamps: true
    }
);
module.exports = mongoose.model('coupon', Couponschema)