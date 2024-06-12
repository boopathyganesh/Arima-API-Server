const ContactUs = require('../../models/customer/contactUs');
// const SendEmail = require('../../utils/sendEmail');


exports.addContactUs = async (req, res) => {
    try {
        const ContactUsData = await ContactUs.create(req.body);
        return res.status(200).send({ status: true, data: ContactUsData, message: 'Query send successfully!.' });
    } catch (err) {
        console.log(err.message)
        res.status(200).send({ status: false, message: 'Server Error' })
    }
};

exports.getAllContactUs = async (req, res) => {
    try {
        const ContactUsData = await ContactUs.find();
        return res.status(200).send({ status: true, data: ContactUsData, message: 'All Queries.' });
    } catch (err) {
        console.log(err.message)
        res.status(200).send({ status: false, message: 'Server Error' })
    }
};

exports.getContactUsById = async (req, res) => {
    console.log('req.body', req.params.id);
    const paramId = req.params.id
    try {
        const ContactUsData = await ContactUs.findById(paramId);
        return res.status(200).send({ status: true, data: ContactUsData, message: 'Querie by ID.' });
    } catch (err) {
        console.log(err.message)
        res.status(200).send({ status: false, message: 'Server Error' })
    }
};

exports.delteContactUsById = async (req, res) => {
    console.log('req.body', req.params.id);
    const paramId = req.params.id
    try {
        await ContactUs.deleteOne({ _id: paramId });
        return res.status(200).send({ status: true, message: 'Queries deleted successfully!' });
    } catch (err) {
        console.log(err.message)
        res.status(200).send({ status: false, message: 'Server Error' })
    }
};