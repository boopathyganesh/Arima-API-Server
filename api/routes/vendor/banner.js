const express = require('express');
const router = express.Router();
module.exports = router;
const { upload } = require("../../helpers/multer");

const BannerController = require("../../controllers/vendor/banner");

router.post('/', upload.single('banner_image'), BannerController.addBanner);

router.get('/', BannerController.getAllBanners);

router.put('/:id', upload.single('banner_image'), BannerController.updateBanner);