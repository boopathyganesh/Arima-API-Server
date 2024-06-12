const express = require('express')
const router = express.Router()
module.exports = router;

const auth = require('../../middleware/auth');

const OrderController = require("../../controllers/customer/order");

router.post('/', auth, OrderController.initilizedOrder);

router.get('/', auth, OrderController.getAllOrders);

router.get('/vendor', auth, OrderController.getVendorOrders);

router.get('/customer', auth, OrderController.getCustomerOrders);

router.put('/approval/:id', auth, OrderController.orderApprovalPendingUpdate);