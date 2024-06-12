const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'customers' },
    product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'products' },
    address: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'customer_address' },
    vendor: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'vendors' },
    quantity: { type: Number, required: true, default: 0 },
    amount: { type: Number, required: false, default: 0 },
    orderStatus: { type: String, required: true, default: "PENDING" },
    status: { type: Number, required: true, default: 1 },
    refNum: { type: String, default: "0", },
    orderID: { type: String, required: true, ref: '' },
},

    {
        timestamps: true
    },
);
module.exports = mongoose.model('orders', OrderSchema)