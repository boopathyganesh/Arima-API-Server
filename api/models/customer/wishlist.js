const mongoose = require('mongoose');

const WishlistSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'customers' },
    product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'products' },
    status: { type: Number, required: true, default: 0 }
},
    {
        timestamps: true
    }
);
module.exports = mongoose.model('wishlists', WishlistSchema)