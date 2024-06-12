const Products = require('../../models/vendor/product');
const Cart = require('../../models/customer/cart');
const Coupon = require('../../models/admin/coupon');
var ObjectId = require('mongodb').ObjectId;

// exports.addCart = async (req, res) => {
//     console.log('req.body', req.body);
//     const { product, status } = req.body
//     const user = req.user.id
//     console.log('product', product);
//     console.log('user', user);
//     try {

//         const userObjectId = ObjectId(user);
//         const productObjectId = ObjectId(product);

//         const product_get = await Products.findOne({
//             $and: [{ user: userObjectId }, { product: productObjectId }]
//         });

//         console.log('product_get', product_get);
//         // const product_get = await Products.findOne({ _id: ObjectId(product) });
//         // const product_get = await Products.findOne({
//         //     $and: [{ user: ObjectId(user) }, { product: ObjectId(product) }]
//         // });
//         // console.log('product_get', product_get);
//         // if (product_get) {
//         //     console.log('1');
//         //     res.status(200).send({ status: true, message: 'Already Cart Added', data: "" })
//         // } else {
//         //     console.log('2');
//         //     const Checkuser = await Cart.findOne({ user, product });
//         //     console.log('Checkuser', Checkuser);
//         //     if (!Checkuser) {
//         //         cart = new Cart({ user, product }) 
//         //         await cart.save()
//         //         res.status(200).send({ status: true, message: 'Cart Added', data: cart })
//         //     } else {
//         //         if (status == "increment") {
//         //             update_qtyy = { qty: Checkuser.qty + 1 }
//         //         } else {
//         //             if (Checkuser.qty == 0) {
//         //                 update_qtyy = { qty: 0 }
//         //             } else {
//         //                 update_qtyy = { qty: Checkuser.qty - 1 }
//         //             }
//         //         }
//         //         await Cart.findOneAndUpdate({ _id: Checkuser._id }, update_qtyy, { upsert: true }).exec();;
//         //         res.status(200).send({ status: true, message: 'Cart Updated', data: "" })
//         //     }
//         // }


//     } catch (err) {
//         console.log(err.message)
//         res.status(200).send({ status: false, message: 'Server Error' })
//     }
// };


exports.addCart = async (req, res) => {
    const { product, quantity, status } = req.body;
    const user = req.user.id;
    try {
        let cartItem = await Cart.findOne({ user, product });

        let productItem = await Products.findOne({ _id: product });

        if (cartItem) {
            console.log('1');
            cartItem = await Cart.findOneAndUpdate(
                { user, product },
                { $inc: { quantity: status === "decrement" ? -quantity : quantity } },
                { new: true, upsert: true }
            );

            // Update the totalPrice
            const finalPrice = productItem?.selling_price * cartItem.quantity;
            cartItem = await Cart.findOneAndUpdate(
                { user, product },
                { $set: { totalPrice: finalPrice, productName: productItem?.name } },
                { new: true, upsert: true }
            );
            if (cartItem.quantity <= 0) {
                await Cart.findOneAndDelete({ user, product });
                return res.json({ success: true, cartItem: null });
            }
        } else {
            console.log('2');
            cartItem = new Cart({ user, product, quantity, productPrice: productItem?.selling_price, totalPrice: productItem?.selling_price, productName: productItem?.name });
            await cartItem.save();
        }

        // Send a success response
        res.json({ success: true, cartItem });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

exports.deleteCart = async (req, res) => {
    const cartId = req.params.id;
    const user = req.user.id;
    try {
        const deletedCartItem = await Cart.findOneAndDelete({ _id: cartId, user });

        if (!deletedCartItem) {
            // If no cart item was found with the specified cartId, return an appropriate response
            return res.status(404).json({ success: false, error: 'Cart item not found' });
        }

        res.json({ success: true, cartItem: null, message: "Delted Successfully." });

    } catch (error) {
        console.error('Error deleting item from cart:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

exports.getCart = async (req, res) => {
    user_id = req.user.id;
    try {
        const cart = await Cart.find({ user: user_id }).populate({ path: 'product' }).exec();
        res.status(200).send({ status: true, message: 'Cart count Loaded', data: cart })
    } catch (err) {
        res.status(200).send({ status: false, message: 'Error in Solving', data: err })
    }
};

exports.getCheckoutData = async (req, res) => {
    user_id = req.user.id;
    try {
        const cart = await Cart.find({ user: user_id }).populate('product').exec();
        const productCategories = [...new Set(cart.map(item => item.product.product_category))];

        const coupons = await Coupon.find({ product_category: { $in: productCategories } });
        const totalPriceSum = cart.reduce((sum, item) => sum + item.totalPrice, 0);
        res.status(200).send({ status: true, message: 'Details Loaded', data: cart, totalPriceSum: totalPriceSum, coupons: coupons })
    } catch (err) {
        console.log('errrrrr', err);
        res.status(200).send({ status: false, message: 'Error in Solving', data: err })
    }
};

exports.getAllCartCount = async (req, res) => {
    user_id = req.user.id;
    try {
        const cart = await Cart.find({ user: user_id }).exec();
        res.status(200).send({ status: true, message: 'Details Loaded', data: cart.length })
    } catch (err) {
        res.status(200).send({ status: false, message: 'Error in Solving', data: err })
    }
};

