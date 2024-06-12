const mongoose = require('mongoose');

const cutomerReviewSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'customers' },
    product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'products' },
    description: { type: String, required: false, default: "" },
    rating: { type: Number, required: true, default: 0 },
},
    {
        timestamps: true
    }
);
module.exports = mongoose.model('customer_review', cutomerReviewSchema)