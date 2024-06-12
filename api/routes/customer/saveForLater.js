const express = require('express')
const router = express.Router()
module.exports = router;

const auth = require('../../middleware/auth');

const SaveForLaterController = require("../../controllers/customer/saveForLater");

router.post('/', auth, SaveForLaterController.addSavelaterProduct);

router.post('/moveToCart', auth, SaveForLaterController.moveToCart);
    
router.get('/all', auth, SaveForLaterController.getSaveLaterProducts);

router.delete('/:id', auth, SaveForLaterController.deleteSaveLaterProduct);

// router.delete('/:id', auth, CartController.deleteCart);