
const Orders = require('../../models/customer/order');

exports.allOrders = async (req, res) => {
    const { orderStatus } = req.query;
    try {
        let filter = {};
        if (orderStatus === "PENDING" || orderStatus === "PROCESSING" || orderStatus === "REJECTED" || orderStatus === "CANCELLED" || orderStatus === "DELIVERED" || orderStatus === "READY") {
            filter = { orderStatus };
        } else {
            filter = {};
        }
        const orders = await Orders.find(filter).populate('user').populate({
            path: 'product', populate: { path: 'product_category', },
        }).populate('address').populate('vendor').exec();
        res.status(200).send({ status: true, message: 'All Orders', data: orders });
    } catch (error) {
        res.status(500).send({ status: false, message: 'Internal Server Error', error: error.message });
    }
};

exports.OrdersGetByShopId = async (req, res) => {
    const shoId = req.params.id;
    try {
        const orders = await Orders.find({ vendor: shoId }).populate('user').populate({
            path: 'product', populate: { path: 'product_category', },
        }).populate('address').populate('vendor').exec();
        res.status(200).send({ status: true, message: 'Orders Get By ShopId', data: orders });
    } catch (error) {
        res.status(500).send({ status: false, message: 'Internal Server Error', error: error.message });
    }
};