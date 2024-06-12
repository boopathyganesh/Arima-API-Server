const express = require("express");
const router = express.Router();
const { upload } = require('../../helpers/multer');

const ShopBannerController = require("../../controllers/master/shopBanner");
console.log('ShopBannerController');

router.post('/upload', upload.single('shop_banner'), ShopBannerController.uploadShopBannerImage);

router.post('/', ShopBannerController.createShopBanner);

router.get('/', ShopBannerController.allShopBanner);

router.get('/shop/:id', ShopBannerController.GetShopBannerByShopId);

router.get('/:id', ShopBannerController.getShopBannerById);

router.put('/:id', ShopBannerController.updateShopBannerById);

router.put('/status/:id', ShopBannerController.updateShopBannerByStaus);

router.delete('/:id', ShopBannerController.deleteShopBannerById);

module.exports = router;