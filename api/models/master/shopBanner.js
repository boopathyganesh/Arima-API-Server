const mongoose = require('mongoose');

const ShopBannersSchema = mongoose.Schema({
    name: { type: String, required: true, default: "" },
    product_category: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'product_category' },
    shop_category: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'vendors' },
    image: { type: String, required: true, default: "" },
    status: { type: Number, required: true, default: 1 },
    createdAt: { type: Date, default: Date.now() }
});
module.exports = mongoose.model('shop_banners', ShopBannersSchema)