const express = require('express')
const router = express.Router()
module.exports = router;

const auth = require('../../middleware/auth');

const WishlistController = require("../../controllers/customer/wishlist");

router.post("/", auth, WishlistController.add_wishlist_product);

router.get("/", auth, WishlistController.wishlist_products);

router.get("/count", auth, WishlistController.wishlist_products_count);