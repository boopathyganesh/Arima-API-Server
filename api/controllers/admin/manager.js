const Manager = require('../../models/admin/manager');

const { filedetails } = require("../../helpers/multer");

exports.uploadMangerImage = async (req, res) => {
    try {
        if (req.file) {
            datalist = filedetails('admin_manager', req.file)
            return res.send({ status: true, data: datalist, message: 'File Uploaded.' });
        }
    } catch (error) {
        console.log('errrr', error);
        res.status(200).send({ status: false, message: error })
    }
};

exports.addManager = async (req, res) => {
    try {
        const coupon = await Manager.create(req.body);
        res.status(200).send({ status: true, message: 'Manager Created Successfully.', data: coupon })
    } catch (err) {
        res.status(500).send({ status: false, message: err })
    }
};

exports.getAllManagers = async (req, res) => {
    try {
        const coupon = await Manager.find();
        res.status(200).send({ status: true, message: 'All Coupons.', data: coupon })
    } catch (err) {
        res.status(500).send({ status: false, message: err })
    }
};

exports.getManagerById = async (req, res) => {
    const managerId = req.params.id;
    try {
        const manager = await Manager.findById(managerId);
        res.status(200).send({ status: true, message: 'Get Manager By Id.', data: manager })
    } catch (err) {
        res.status(500).send({ status: false, message: err })
    }
};

exports.updateManagerById = async (req, res) => {
    const managerId = req.params.id;
    const managerData = req.body;
    try {
        const manager = await Manager
            .findByIdAndUpdate(managerId, managerData?.data, { new: true })
            .exec();

        if (!manager) {
            return res.status(404).send({ status: false, message: 'Manager not found' });
        };
        res.status(200).send({ status: true, message: 'Updated Manager.', data: manager })
    } catch (err) {
        console.log('errrr', err);
        res.status(500).send({ status: false, message: err })
    }
};

exports.deleteManagerById = async (req, res) => {
    const managerId = req.params.id;
    try {
        await Manager.deleteOne({ _id: managerId });
        res.status(200).send({ status: true, message: 'Manager Deleted successfully.' })
    } catch (err) {
        res.status(500).send({ status: false, message: err })
    }
};