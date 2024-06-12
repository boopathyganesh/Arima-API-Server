const SaveLaterProdcut = require('../../models/customer/saveForLater');
const Cart = require('../../models/customer/cart');

exports.addSavelaterProduct = async (req, res) => {
    try {
        const bodyData = req.body;
        const createData = await SaveLaterProdcut.create(bodyData);
        if (createData) {
            await Cart.findByIdAndDelete(bodyData._id);
            res.status(200).send({ status: true, message: 'Save Later Prodcut Details' });
        }
    } catch (error) {
        res.status(200).send({ status: false, message: 'Error in Solving', data: error })
    };
};

exports.getSaveLaterProducts = async (req, res) => {
    user_id = req.user.id;
    try {
        const saveLater = await SaveLaterProdcut.find({ user: user_id }).populate('product').exec();
        const totalPriceSum = saveLater.reduce((sum, item) => sum + item.totalPrice, 0);
        res.status(200).send({ status: true, message: 'Details Loaded', data: saveLater, totalPriceSum: totalPriceSum })
    } catch (err) {
        res.status(200).send({ status: false, message: 'Error in Solving', data: err })
    }
};

exports.moveToCart = async (req, res) => {
    try {
        const bodyData = req.body;
        const createData = await Cart.create(bodyData);
        if (createData) {
            await SaveLaterProdcut.findByIdAndDelete(bodyData._id);
            res.status(200).send({ status: true, message: 'Moved to cart' });
        }
    } catch (error) {
        res.status(200).send({ status: false, message: 'Error in Solving', data: error })
    };
};

exports.deleteSaveLaterProduct = async (req, res) => {
    const saveLaterProductId = req.params.id;
    const user = req.user.id;
    try {
        await SaveLaterProdcut.findOneAndDelete({ _id: saveLaterProductId, user });
        res.json({ success: true, cartItem: null, message: "Delted Successfully." });

    } catch (error) {
        console.error('Error deleting item from cart:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

