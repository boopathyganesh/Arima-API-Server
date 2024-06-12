const express = require('express');
const router = express.Router();
module.exports = router;
const VendorContactController = require("../../controllers/admin/vendorContact");

router.post('/', VendorContactController.addVendorContact);

router.get('/', VendorContactController.getAllVendorContacts);

router.get('/:id', VendorContactController.getVendorContactById);

router.put('/:id', VendorContactController.updateVendorContactById);

router.delete('/:id', VendorContactController.deleteVendorContactById);