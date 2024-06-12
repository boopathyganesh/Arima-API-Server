const express = require('express')
const router = express.Router()
module.exports = router;
const ShopController = require("./shop");
const UserController = require("./users");
const OrderController = require("./order");
const CouponController = require("./coupon");
const ManagerController = require("./manager");
const CustomerContactController = require("./customerContact");
const VendorContactController = require("./vendorContact");
const ProdcutsController = require("./product");

const ProductCategoryController = require("./productCategory");

router.use('/shop', ShopController);

router.use('/user', UserController);

router.use('/orders', OrderController);

router.use('/coupon', CouponController);

router.use('/manager', ManagerController);

router.use('/customerContact', CustomerContactController);

router.use('/vendorContact', VendorContactController);

router.use('/productCategory', ProductCategoryController);

router.use('/product', ProdcutsController)