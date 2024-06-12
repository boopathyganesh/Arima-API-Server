const CustomerContact = require('../../models/admin/customerContact');

exports.addCustomerContact = async (req, res) => {
    try {
        const customerContact = await CustomerContact.create(req.body);
        res.status(200).send({ status: true, message: 'Customer Contact Created Successfully.', data: customerContact })
    } catch (err) {
        res.status(500).send({ status: false, message: err })
    }
};

exports.getAllCustomerContacts = async (req, res) => {
    try {
        const customerContact = await CustomerContact.find();
        const singleCustomerContact = customerContact.length > 0 ? customerContact[0] : {};

        res.status(200).send({
            success: true,
            message: 'Successfully retrieved customer contact.',
            data: singleCustomerContact
        });
    } catch (err) {
        console.log('vvvvvv', err);
        res.status(500).send({ status: false, message: err })
    }
};

exports.getCustomerContactById = async (req, res) => {
    const customerContactId = req.params.id;
    try {
        const customerContact = await CustomerContact.findById(customerContactId);
        res.status(200).send({ status: true, message: 'Get Customer Contact By Id.', data: customerContact })
    } catch (err) {
        res.status(500).send({ status: false, message: err })
    }
};

exports.updateCustomerContactById = async (req, res) => {
    const customerContactId = req.params.id;
    const customerContactData = req.body;
    try {
        const customerContact = await CustomerContact
            .findByIdAndUpdate(customerContactId, customerContactData?.data, { new: true })
            .exec();

        if (!customerContact) {
            return res.status(404).send({ status: false, message: 'Customer Contact not found' });
        };
        res.status(200).send({ status: true, message: 'Updated Customer Contact.', data: customerContact })
    } catch (err) {
        console.log('errrr', err);
        res.status(500).send({ status: false, message: err })
    }
};

exports.deleteCustomerContactById = async (req, res) => {
    const customerContactId = req.params.id;
    try {
        await CustomerContact.deleteOne({ _id: customerContactId });
        res.status(200).send({ status: true, message: 'Customer Contact Deleted successfully.' })
    } catch (err) {
        res.status(500).send({ status: false, message: err })
    }
};