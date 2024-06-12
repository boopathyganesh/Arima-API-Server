const Products = require('../../models/vendor/product');
const Vendor = require('../../models/vendor/addShop');
const Wishlist = require('../../models/customer/wishlist');
const mongoose = require('mongoose');
const { filedetails } = require("../../helpers/multer");
const Review = require('../../models/customer/review');

exports.ProductsByShop = async (req, res) => {
    const shopId = req.params.id;
    try {
        const products = await Products.find({ shop_category: shopId }).populate('product_category').populate('shop_category', 'shop_name').exec();
        res.status(200).send({
            status: true,
            message: 'Products filtered by status and shopId',
            data: products
        });

    } catch (err) {
        res.status(500).send({ status: false, message: 'Error in processing the request', data: err });
    }
};

exports.allProductsByCategory = async (req, res) => {
    const categoryId = req.params.id;
    const { product_status } = req.query;
    try {
        const categoryFilter = { product_category: categoryId };

        let filter = { ...categoryFilter };

        if (product_status === "PENDING" || product_status === "APPROVED" || product_status === "REJECTED") {
            filter.product_status = product_status;
        }

        const products = await Products.find(filter).populate('product_category').populate('shop_category', 'shop_name').exec();

        res.status(200).send({
            status: true,
            message: 'Products filtered by status and categoryId',
            data: products,
        });

    } catch (err) {
        res.status(500).send({ status: false, message: 'Error in processing the request', data: err });
    }
};
