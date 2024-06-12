const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');
const { upload } = require('../../helpers/multer');

const ProductsController = require("../../controllers/vendor/product");

router.post('/products_image', upload.single('products_image'), ProductsController.uploadProductImage);

router.post("/products_images", upload.array("products_images"), ProductsController.uploadProductImages);

router.post('/', ProductsController.createProducts);

router.get('/', ProductsController.allProducts);

router.get('/auth/:id', auth, ProductsController.productGetByIdwithAuth);

router.get('/shop/:id', ProductsController.allProductsByShop);

router.get('/category/:id', ProductsController.allProductsByCategory);

router.get('/filter', ProductsController.filterProducts);

router.get('/:id', ProductsController.productGetById);

router.put('/:id', ProductsController.updateProducts);

router.put('/approval/:id', ProductsController.productsApprovalReject);

module.exports = router;