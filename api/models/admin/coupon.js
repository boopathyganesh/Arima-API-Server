const mongoose = require('mongoose');


const Couponschema = mongoose.Schema({
    title: { type: String, required: true, default: "" },
    type: { type: String, required: false, default: "" },
    code: { type: String, required: false, default: "" },
    discount: { type: String, default: "" },
    discount_type: { type: String, default: "" },
    minPurchase: { type: Number, required: false, default: 0 },
    expiryDate: { type: Date, default: Date.now() },
    limitUser: { type: Number, required: false, default: 0 },
    maxDiscount: { type: Number, default: 0 },
    product_category: { type: mongoose.Schema.Types.ObjectId, ref: 'product_category' },
    shop_category: { type: mongoose.Schema.Types.ObjectId, ref: 'vendors' },
    startDate: { type: Date, default: Date.now() },
    is_active: { type: Boolean, required: true, default: true },
    status: { type: Number, required: true, default: 1 }
},
    {
        timestamps: true
    }
);
module.exports = mongoose.model('coupon', Couponschema)