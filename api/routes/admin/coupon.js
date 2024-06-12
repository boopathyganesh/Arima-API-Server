const express = require('express');
const router = express.Router();
module.exports = router;

const CouponController = require("../../controllers/admin/coupon");

router.post('/', CouponController.createCoupon);

router.get('/', CouponController.getAllCoupon);

router.get('/:id', CouponController.getCouponById);

router.put('/:id', CouponController.updateCouponById);

router.delete('/:id', CouponController.deleteCouponById);