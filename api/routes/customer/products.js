
const express = require('express')
const router = express.Router()
module.exports = router;

const ProdcutsController = require("../../controllers/customer/product");
const auth = require('../../middleware/auth');

router.get('/filter', ProdcutsController.productsFilterByOptions);

router.get('/wishlist/:id', auth, ProdcutsController.allProductsWithWishlist);
// router.post('/customerWebLogin', CustomersController.customerWebLogin);
// router.get('/all', CustomersController.all_customer);
// router.get('/', auth, CustomersController.customerDetails);