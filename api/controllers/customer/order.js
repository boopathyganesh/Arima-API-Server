const Cart = require("../../models/customer/cart");
const Order = require("../../models/customer/order");

exports.initilizedOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const orderData = req.body;
        var now = new Date().getTime();
        var random = Math.floor(Math.random() * 100000);
        random = "" + random;
        while (random.length < 5) {
            random = "0" + random;
        }
        var refNum = now + random;


        function getRandom5DigitNumber() {
            const min = 10000;
            const max = 99999;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        // Example: Generate a random 5-digit integer
        const random5DigitNumber = getRandom5DigitNumber();

        if (orderData && orderData.cartDetails && orderData.cartDetails.length > 0) {
            const orderedProductsDocuments = orderData.cartDetails.map(item => ({
                user: userId,
                orderID: "OD" + random5DigitNumber,
                product: item?.product?._id,
                amount: item?.totalPrice,
                quantity: item?.quantity,
                refNum: refNum,
                vendor: item?.product?.shop_category,
                address: item?.address
            }));

            const orderedData = await Order.insertMany(orderedProductsDocuments);
            if (orderedData.length > 0) {
                // Delete items from the cart
                const cartItemIds = orderData.cartDetails.map(item => item._id);
                await Cart.deleteMany({ _id: { $in: cartItemIds } }).exec();

                res.status(200).json({
                    status: true,
                    message: 'Order initialized successfully',
                });
            } else {
                res.status(500).json({
                    status: false,
                    message: 'Failed to create orders',
                });
            }
        } else {
            res.status(400).json({
                status: false,
                message: 'Invalid order data provided',
            });
        }
    } catch (error) {
        console.error('Error initializing order:', error);
        res.status(500).json({
            status: false,
            message: 'Error initializing order',
            error: error.message,
        });
    }
};

exports.getAllOrders = async (req, res) => {
    console.log('orders');
    try {
        const userId = req.user.id;
        // const OrdersData = await Order.find({ user: userId });
        const OrdersData = await Order.find({ user: userId }).populate('product').populate('user').populate('address').sort({ createdAt: - 1 }).exec();
        res.status(200).json({
            status: true,
            message: 'All Orders.',
            data: OrdersData,
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Error initializing order',
            error: error.message,
        });
    }
};

exports.getVendorOrders = async (req, res) => {
    const { orderStatus } = req.query;
    const vendorId = req.user.id;
    try {
        const filter = { vendor: vendorId, orderStatus };
        if (!(orderStatus === "PENDING" || orderStatus === "PROCESSING" || orderStatus === "READY" || orderStatus === "REJECTED" || orderStatus === "CANCELLED" || orderStatus === "DELIVERED")) {
            delete filter.orderStatus;
        }
        const OrdersData = await Order.find(filter).populate('product').populate('user').populate('address').exec();

        if (OrdersData.length === 0) {
            res.status(200).send({ status: true, message: 'No data found', data: [] });
        } else {
            res.status(200).send({ status: true, message: 'Vendor Orders', data: OrdersData });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: false, message: 'Internal Server Error' });
    }
};

exports.getCustomerOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const OrdersData = await Order.find({ user: userId }).populate('product').populate('user').populate('address').sort({ createdAt: - 1 }).exec();
        res.status(200).json({
            status: true,
            message: 'Customer Orders.',
            data: OrdersData,
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Error initializing order',
            error: error.message,
        });
    }
};

exports.orderApprovalPendingUpdate = async (req, res) => {
    const OrderId = req.params.id;
    const status = req.query.status;
    try {
        let updateData;

        if (status === "APPROVED") {
            updateData = { status: 'APPROVED' };
        } else if (status === "PROCESSING") {
            updateData = { status: 'PROCESSING' };
        } else if (status === "READY") {
            updateData = { status: 'READY' };
        } else {
            updateData = { status: 'REJECTED' };
        }
        const result = await Order.updateOne({ _id: OrderId }, updateData);

        if (result.modifiedCount > 0) {
            const successMessage =
                status === "APPROVED" ? 'Order Approved Successfully' :
                    status === "PROCESSING" ? "Order Processing" :
                        status === "READY" ? "Order Ready" :
                            'Order Rejected Successfully';
            res.status(200).send({ status: true, message: successMessage });
        } else {
            res.status(404).send({ status: false, message: 'Order not found' });
        }
    } catch (err) {
        res.status(500).send({ status: false, message: 'Error in updating category status', data: err });
    }

};
