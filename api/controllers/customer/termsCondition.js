const PrivacyPolicy = require('../../utils/CustomerPrivacyPolicy');
const TermsAndUsePolicy = require('../../utils/CustomerTermsConditions');
const ReturnPolicy = require('../../utils/CustomerReturnPolicy');

exports.getPrivacyPolicy = async (req, res) => {
    try {
        res.status(200).send({ status: true, message: 'Customer Privacy Policy', data: PrivacyPolicy })
    } catch (err) {
        res.status(200).send({ status: false, message: 'Error in Solving', data: err })
    }
};

exports.getTermsAndUsePolicy = async (req, res) => {
    try {
        res.status(200).send({ status: true, message: 'Customer Terms And Use Policy', data: TermsAndUsePolicy })
    } catch (err) {
        res.status(200).send({ status: false, message: 'Error in Solving', data: err })
    }
};

exports.getReturnPolicy = async (req, res) => {
    try {
        res.status(200).send({ status: true, message: 'Customer ReturnPolicy', data: ReturnPolicy })
    } catch (err) {
        res.status(200).send({ status: false, message: 'Error in Solving', data: err })
    }
};