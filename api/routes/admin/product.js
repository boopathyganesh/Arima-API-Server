const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');
const { upload } = require('../../helpers/multer');

const ProductsController = require("../../controllers/admin/product");

router.get('/shop/:id', ProductsController.ProductsByShop);

module.exports = router;