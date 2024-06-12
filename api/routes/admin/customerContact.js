const express = require('express');
const router = express.Router();
module.exports = router;

const CustomerContactController = require("../../controllers/admin/customerContact.js");

router.post('/', CustomerContactController.addCustomerContact);

router.get('/', CustomerContactController.getAllCustomerContacts);

router.get('/:id', CustomerContactController.getCustomerContactById);

router.put('/:id', CustomerContactController.updateCustomerContactById);

router.delete('/:id', CustomerContactController.deleteCustomerContactById);