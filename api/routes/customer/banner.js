const express = require('express');
const router = express.Router();
module.exports = router;

const BannerController = require("../../controllers/customer/banner");

router.get('/', BannerController.getAllBanners);