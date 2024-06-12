const express = require('express');
const router = express.Router();
module.exports = router;

const OTPController = require("../../controllers/common/otp");

router.post('/sendotp_check', OTPController.sendotp_check);

router.post('/validate_otp', OTPController.validate_otp);