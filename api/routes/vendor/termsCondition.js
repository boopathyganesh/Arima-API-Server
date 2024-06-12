const express = require('express');
const router = express.Router();
module.exports = router;

const TermsConditionsController = require("../../controllers/vendor/termsCondition");

router.get('/all', TermsConditionsController.getTermsConditionse);