const express = require('express')
const router = express.Router()
module.exports = router;
const BannerController = require("./banner");
const CartController = require("./cart");
const WishlistController = require("./wishlist");
const SavelaterProductsController = require("./saveForLater");
const AddressController = require("./address");
const UserController = require("./user");
const CheckoutController = require("./cart");
const ProductController = require("./products");
const ReviewController = require("./review");
const TermsConditionsController = require("./termsCondition");
const InvoiceController = require("./invoice");

router.use("/", UserController);

router.use("/banner", BannerController);

router.use("/cart", CartController);

router.use("/wishlist", WishlistController);

router.use("/saveLaterProduts", SavelaterProductsController);

router.use("/address", AddressController);

router.use("/checkout", CheckoutController);

router.use("/products", ProductController);

router.use("/review", ReviewController);

router.use("/termsConditions", TermsConditionsController);

router.use("/invoices", InvoiceController);