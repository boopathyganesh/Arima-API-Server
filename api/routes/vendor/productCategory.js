const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');
const { upload } = require('../../helpers/multer');

const ProductCategoryController = require("../../controllers/vendor/productCategory");

router.post('/upload', upload.single('products_category'), ProductCategoryController.uploadProductCategory);
router.post('/', ProductCategoryController.createProductCategory);
router.get('/', ProductCategoryController.allProductCategory);
router.get('/auth', auth, ProductCategoryController.allProductCategorywithAuth);
router.get('/:id', ProductCategoryController.getProductCategoryById);
router.get('/shop/:id', ProductCategoryController.getProductCategoryByShopId);

router.put('/:id', ProductCategoryController.updateProductCategoryById);

router.put('/approval/:id', ProductCategoryController.proCategoryApprovalRejectByAdmin);
router.delete('/:id', ProductCategoryController.deleteProductCategoryById);

module.exports = router;