const express = require('express');
const router = express.Router();
const invoiceController = require('../../controllers/customer/invoice');

router.post('/generate', invoiceController.generateInvoice);
router.get('/', invoiceController.getInvoice);

module.exports = router;
