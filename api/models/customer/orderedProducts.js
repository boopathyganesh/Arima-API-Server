const mongoose = require('mongoose');

const OrderedProductsSchema = mongoose.Schema({
    orderID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'orders' },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'orders' },
    product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'products' },
    // vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'vendors' },
    quantity: { type: Number, required: true, default: 0 },
    amount: { type: Number, required: false, default: 0 },
},
    {
        timestamps: true
    },
);
module.exports = mongoose.model('orderedProducts', OrderedProductsSchema)