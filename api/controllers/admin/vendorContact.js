const VendorContact = require('../../models/admin/vendorContact');

exports.addVendorContact = async (req, res) => {
    try {
        const vendorContact = await VendorContact.create(req.body);
        res.status(200).send({ status: true, message: 'Manager Created Successfully.', data: vendorContact })
    } catch (err) {
        res.status(500).send({ status: false, message: err })
    }
};

exports.getAllVendorContacts = async (req, res) => {
    try {
        const vendorContact = await VendorContact.find();
        const singleVendorContact = vendorContact.length > 0 ? vendorContact[0] : {};

        res.status(200).send({
            success: true,
            message: 'Successfully retrieved Vendor contact.',
            data: singleVendorContact
        });
    } catch (err) {
        console.log('vvvvvv', err);
        res.status(500).send({ status: false, message: err })
    }
    // try {
    //     const vendorContact = await VendorContact.find();
    //     res.status(200).send({ status: true, message: 'All Vendor Contact.', data: vendorContact })
    // } catch (err) {
    //     res.status(500).send({ status: false, message: err })
    // }
};

exports.getVendorContactById = async (req, res) => {
    const vendorContactId = req.params.id;
    try {
        const vendorContact = await VendorContact.findById(vendorContactId);
        res.status(200).send({ status: true, message: 'Get Vendor Contact By Id.', data: vendorContact })
    } catch (err) {
        res.status(500).send({ status: false, message: err })
    }
};

exports.updateVendorContactById = async (req, res) => {
    const vendorContactId = req.params.id;
    const vendorContactData = req.body;
    try {
        const vendorContact = await VendorContact
            .findByIdAndUpdate(vendorContactId, vendorContactData?.data, { new: true })
            .exec();

        if (!vendorContact) {
            return res.status(404).send({ status: false, message: 'Vendor Contact not found' });
        };
        res.status(200).send({ status: true, message: 'Updated Vendor Contact.', data: vendorContact })
    } catch (err) {
        console.log('errrr', err);
        res.status(500).send({ status: false, message: err })
    }
};

exports.deleteVendorContactById = async (req, res) => {
    const vendorContactId = req.params.id;
    try {
        await VendorContact.deleteOne({ _id: vendorContactId });
        res.status(200).send({ status: true, message: 'Vendor Contact Deleted successfully.' })
    } catch (err) {
        res.status(500).send({ status: false, message: err })
    }
};