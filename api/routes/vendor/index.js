const express = require('express');
const router = express.Router();
module.exports = router;
const ShopController = require("./addShop");
// const CouponController = require("./coupon");
const BannerController = require("./banner");
const TermsConditionsController = require("./termsCondition");
const ProductCategoryController = require("./productCategory");

router.use('/', ShopController);

// router.use('/coupon', CouponController);

router.use("/banner", BannerController);

router.use("/termsConditions", TermsConditionsController);

router.use("/ProductCategory", ProductCategoryController);