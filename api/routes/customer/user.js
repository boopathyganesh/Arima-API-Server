
const express = require('express')
const router = express.Router()
module.exports = router;

const CustomersController = require("../../controllers/customer/user");
const auth = require('../../middleware/auth');

router.post('/register', CustomersController.create_customer);

router.post('/customerWebLogin', CustomersController.customerWebLogin);

router.post('/forgotpassword', CustomersController.forgotPassword); //test

router.post('/resetpassword', CustomersController.resetPassword); //test

router.get('/all', CustomersController.all_customer);

router.get('/', auth, CustomersController.customerDetails);

router.put('/:id', auth, CustomersController.updateCustomerDetails);

router.put('/status/:id', CustomersController.updateCustomerStatus);