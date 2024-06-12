const mongoose = require('mongoose');

const ProductCategorySchema = mongoose.Schema({
    productCategoryName: { type: String, required: true, default: "" },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'vendors' },
    key_name: { type: String },
    image: { type: String, required: true, default: "" },
    status: { type: Number, required: true, default: 1 },
    categoryStatus: { type: String, required: true, default: "PENDING" },
    type: { type: String }
},
    {
        timestamps: true
    });
module.exports = mongoose.model('product_category', ProductCategorySchema)