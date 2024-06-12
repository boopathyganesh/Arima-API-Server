const Address = require('../../models/customer/address');

exports.addAddress = async (req, res) => {
    const userId = req.user.id;
    try {
        const AddressData = {
            ...req.body,
            user: userId
        };
        const data = await Address.create(AddressData);
        return res.status(200).send({ status: true, data: data, message: 'Address Added Successfully!.' });
    } catch (err) {
        console.log(err.message)
        res.status(200).send({ status: false, message: 'Server Error' })
    }
};

exports.getAllAddress = async (req, res) => {
    const userId = req.user.id;
    try {
        const AddressData = await Address.find({ user: userId });
        return res.status(200).send({ status: true, data: AddressData, message: 'All Address.' });
    } catch (err) {
        console.log(err.message)
        res.status(200).send({ status: false, message: 'Server Error' })
    }
};

exports.getAddressById = async (req, res) => {
    const addressId = req.params.id;
    try {
        const AddressData = await Address.findById(addressId);
        return res.status(200).send({ status: true, data: AddressData, message: 'Address Get By Id' });
    } catch (err) {
        console.log(err.message)
        res.status(200).send({ status: false, message: 'Server Error' })
    }
};

exports.updateAddressById = async (req, res) => {
    const addressId = req.params.id;
    try {
        await Address.updateOne({ _id: addressId }, { $set: req.body });
        res.status(200).send({ status: true, message: 'Address Updated Successfully' })
    } catch (err) {
        res.status(500).send({ status: false, message: 'Server error', data: err })
    }
}

exports.delteAddressUsById = async (req, res) => {
    console.log('req.body', req.params.id);
    const paramId = req.params.id
    try {
        await Address.deleteOne({ _id: paramId });
        return res.status(200).send({ status: true, message: 'Address deleted successfully!' });
    } catch (err) {
        console.log(err.message)
        res.status(200).send({ status: false, message: 'Server Error' })
    }
};

