const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');
const { upload } = require('../../helpers/multer');

// const { upload } = require('../../helpers/multer');

const AddShopCategoryController = require("../../controllers/vendor/addShop");

router.post('/shop_profile', upload.single('shop_profile'), AddShopCategoryController.uploadVendorProfile);

router.post('/shop_image', upload.single('shop_image'), AddShopCategoryController.uploadShopImage);

router.post('/documents', upload.single('shop_documents'), AddShopCategoryController.uploadShopDocuments);

router.post("/add", AddShopCategoryController.addShop);

router.get('/', AddShopCategoryController.getAllShopsByApprove);

router.get('/all', AddShopCategoryController.getAllShops);

router.get('/approval', AddShopCategoryController.shopApprovalPendingList);

router.get('/activeShops', AddShopCategoryController.activeShopsList);

router.get('/:id', AddShopCategoryController.getShopById);

router.get('/shopByCategory/:id', AddShopCategoryController.shopFilterByProductCategory);

router.put("/:id", AddShopCategoryController.updateShopDetails);

router.put('/approval/:id', AddShopCategoryController.shopApprovalRejectByAdmin);

router.put('/status/:id', AddShopCategoryController.shopStatusActiveInactive);

module.exports = router;