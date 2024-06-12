
const Shop = require('../../models/vendor/addShop');

exports.shopApprovalRejectList = async (req, res) => {
    const { shop_status } = req.query;
    try {
        let filter = {};

        if (shop_status === "PENDING" || shop_status === "APPROVED" || shop_status === "REJECTED") {
            filter.shop_status = shop_status;
        }
        const shop = await Shop.find(filter).exec();
        if (shop.length === 0) {
            res.status(200).send({ status: true, message: 'No data found', data: [] });
        } else {
            res.status(200).send({ status: true, message: 'All Shopps', data: shop });
        }
    } catch (error) {
        res.status(500).send({ status: false, message: 'Internal Server Error', error: error.message });
    }
};