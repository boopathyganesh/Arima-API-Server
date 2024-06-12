const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
module.exports = router;

const AddressController = require("../../controllers/customer/address");

router.post('/', auth, AddressController.addAddress);

router.get('/', auth, AddressController.getAllAddress);

router.get('/:id', auth, AddressController.getAddressById);

router.put('/:id', auth, AddressController.updateAddressById);

router.delete('/:id', auth, AddressController.delteAddressUsById);