const TermsConditions = require('../../utils/vendorTermsConditions');

exports.getTermsConditionse = async (req, res) => {
    try {
        res.status(200).send({ status: true, message: 'Vendor Terms Conditions', data: TermsConditions })
    } catch (err) {
        res.status(200).send({ status: false, message: 'Error in Solving', data: err })
    }
};