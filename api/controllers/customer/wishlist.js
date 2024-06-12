const Wishlist = require("../../models/customer/wishlist");

exports.add_wishlist_product = async (req, res) => {
    console.log('add wishlist', req.body);
    const { product } = req.body;
    const user = req.user.id;

    try {
        const existingWishlistItem = await Wishlist.findOne({ user, product });

        if (!existingWishlistItem) {
            // If the item is not in the wishlist, add it
            const newWishlistItem = new Wishlist({ user, product });
            await newWishlistItem.save();
            res.status(200).send({ status: true, message: 'Wishlist Added', data: newWishlistItem });
        } else {
            // If the item is already in the wishlist, remove it
            await Wishlist.findByIdAndDelete(existingWishlistItem._id);

            res.status(200).send({ status: true, message: 'Wishlist Removed', data: existingWishlistItem });
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send({ status: false, message: 'Server Error' });
    }

};

exports.wishlist_products = async (req, res) => {
    console.log('get all products with wishlist');
    const userId = req.user.id;
    try {

        const wishlistItems = await Wishlist.find({ user:userId }).populate('product').exec();
        // // Extract product IDs from wishlist items
        // const wishlistProductIds = wishlistItems.map(item => item.product);
    
        // // Create a new array with product details, including whether each product is in the wishlist
        // const productsWithWishlist = allProducts.map(product => ({
        //     ...product.toObject(),
        //     isInWishlist: wishlistProductIds.includes(product._id.toString()),
        // }));
    
        res.status(200).send({ status: true, message: 'Products with Wishlist retrieved', data: wishlistItems });
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ status: false, message: 'Server Error' });
    }
    

}

exports.wishlist_products_count = async (req, res) => {
    const userId = req.user.id;
    try {
        const wishlistItems = await Wishlist.find({ user: userId }).populate('product').exec();
        const wishlistCount = wishlistItems.length;
        res.status(200).send({ status: true, message: 'Wishlist count retrieved', data: { count: wishlistCount } });
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ status: false, message: 'Server Error' });
    }
}

// exports.wishlist_products = async (req, res) => {
//     console.log('get all products with wishlist');
//     const user = req.user.id;
    
//     try {
//         // Find all products
//         const allProducts = await Product.find();
    
//         // Find wishlist items for the specified user
//         const wishlistItems = await Wishlist.find({ user });
    
//         // Extract product IDs from wishlist items
//         const wishlistProductIds = wishlistItems.map(item => item.product);
    
//         // Create a new array with product details, including whether each product is in the wishlist
//         const productsWithWishlist = allProducts.map(product => ({
//             ...product.toObject(),
//             isInWishlist: wishlistProductIds.includes(product._id.toString()),
//         }));
    
//         res.status(200).send({ status: true, message: 'Products with Wishlist retrieved', data: productsWithWishlist });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send({ status: false, message: 'Server Error' });
//     }
    

// }

// exports.wishlist_products = async (req, res) => {
//     console.log('widhlist');
//     user_id = req.user.id
//     filter = { 'user': ObjectId(user_id) }
//     try {
//         const wishlist = await Wishlist.find(filter)
//             .populate({
//                 path: 'product',
//                 // select: {
//                 //   _id: 1, name: 1, image: 1, price: 1, actual_price: 1, selling_price: 1, counts: 1, unit: 1, discount_perc: 1,
//                 //   stock: 1, describtion: 1
//                 // },
//                 //match: { shop_category: {$ne: user_id}},
//                 // populate: {
//                 //   path: 'vendor',
//                 //   select: { _id: 1, name: 1, shop_name: 1, shop_image: 1, area_zone: 1, close_time: 1 }
//                 // }
//             }).exec();
//         res.status(200).send({ status: true, message: 'Wishlist Produts', data: wishlist })
//     } catch (err) {
//         res.status(200).send({ status: false, message: 'Error in Solving', data: err })
//     }
// };