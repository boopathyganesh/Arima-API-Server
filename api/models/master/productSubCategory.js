const mongoose = require('mongoose');

const ProductSubCategorySchema = mongoose.Schema({
    productSubCategoryName:{ type: String, required: true,default:""},
    productCategory:{ type:mongoose.Schema.Types.ObjectId,required: true, ref:'product_category' },
    image:{ type: String, required: true,default:""},
    status:{ type: Number, required: true,default:0 },
    createdAt: { type: Date,default: Date.now() }    
});
module.exports = mongoose.model('product_sub_category', ProductSubCategorySchema)