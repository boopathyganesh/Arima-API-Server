const express = require("express");
const router = express.Router();
const { upload } = require('../../helpers/multer');

const MainBannerController = require("../../controllers/master/mainBanner");

router.post('/upload', upload.single('main_banner'), MainBannerController.uploadMainBannerImage);

router.post('/', MainBannerController.createMainBanner);

router.get('/', MainBannerController.allMainBanner);

router.get('/:id', MainBannerController.getMainBannerById);

router.put('/:id', MainBannerController.updateMainBannerById);

router.put('/status/:id', MainBannerController.updateMainBannerByStaus);

router.delete('/:id', MainBannerController.deleteMainBannerById);

module.exports = router;