const express = require('express');
const router = express.Router();
module.exports = router;

const ShopController = require("../../controllers/admin/shop");

router.get('/aprovalReject', ShopController.shopApprovalRejectList);