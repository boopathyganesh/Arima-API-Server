const express = require('express');
const router = express.Router();
module.exports = router;

const TermsConditionsController = require("../../controllers/customer/termsCondition");

router.get('/termOfUse', TermsConditionsController.getTermsAndUsePolicy);

router.get('/returnPolicy', TermsConditionsController.getReturnPolicy);

router.get('/privacyPolicy', TermsConditionsController.getPrivacyPolicy);