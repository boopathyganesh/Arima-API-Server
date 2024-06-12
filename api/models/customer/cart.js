const mongoose = require('mongoose');


const CartSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'customers' },
    product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'products' },
    counts: { type: Number, required: true, default: 1 },
    unit: { type: String, required: false, default: "" },
    quantity: { type: Number, required: true, default: 1 },
    status: { type: Number, required: true, default: 0 },
    productPrice: { type: Number, required: true, default: 0 },
    totalPrice: { type: Number, required: true, default: 0 },
    productName: { type: String, required: false, default: "" },
},
    {
        timestamps: true
    },
);
module.exports = mongoose.model('carts', CartSchema)