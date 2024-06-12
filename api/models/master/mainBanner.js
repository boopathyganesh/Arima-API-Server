const mongoose = require('mongoose');

const MainBannersSchema = mongoose.Schema({
    name:{ type: String, required: true,default:""},
    productCategory:{ type:mongoose.Schema.Types.ObjectId,required: true, ref:'product_category' },
    image:{ type: String, required: true,default:""},
    status:{ type: Number, required: true,default:1 },
    createdAt: { type: Date,default: Date.now() }    
});
module.exports = mongoose.model('main_banners', MainBannersSchema)