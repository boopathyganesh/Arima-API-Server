const express = require('express');
const router = express.Router();
module.exports = router;

const OrdersController = require("../../controllers/admin/orders");

router.get('/', OrdersController.allOrders);

router.get('/shop/:id', OrdersController.OrdersGetByShopId);