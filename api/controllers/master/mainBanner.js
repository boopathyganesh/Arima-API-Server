const MainBanner = require('../../models/master/mainBanner');
const { filedetails } = require("../../helpers/multer");

exports.uploadMainBannerImage = async (req, res) => {
    try {
        if (req.file) {
            datalist = filedetails('main_banner', req.file)
            return res.send({ status: true, data: datalist, message: 'File Uploaded.' });
        }
    } catch (error) {
        res.status(200).send({ status: false, message: error })
    }
};

exports.createMainBanner = async (req, res) => {
    try {
        const mainBanner = await MainBanner.create(req.body)
        res.status(200).send({ status: true, message: 'Main Banner Added', data: mainBanner })
    } catch (error) {
        res.status(500).send({ status: false, message: 'Server Error ' + error })
    }

};

exports.allMainBanner = async (req, res) => {
    try {
        const mainBannerData = await MainBanner.find().sort({ createdAt: -1 }).populate('productCategory').exec();
        res.status(200).send({ status: true, message: 'Main Banner', data: mainBannerData });
    } catch (error) {
        res.status(500).send({ status: false, message: 'Internal Server Error', error: error.message });
    }
};

exports.getMainBannerById = async (req, res) => {
    const mainBannerId = req.params.id;
    try {
        const mainBanner = await MainBanner.findOne({ _id: mainBannerId }).populate('productCategory').exec();
        res.status(200).send({ status: true, message: 'Main Banner By Id', data: mainBanner })
    } catch (err) {
        res.status(500).send({ status: false, message: 'Error in Solving', data: err })
    }
};

exports.updateMainBannerById = async (req, res) => {
    console.log('productCategoryName', req.body);
    try {
        const mainBannerId = req.params.id;
        const mainBanner = await MainBanner.findByIdAndUpdate(mainBannerId, req?.body?.data, { new: true }).exec();
        if (!mainBanner) {
            return res.status(404).send({ status: false, message: 'Main Banner not found' });
        }
        res.status(200).send({ status: true, message: 'Main Banner Updated', data: mainBanner });
    } catch (err) {
        console.error("dada", err.message);
        res.status(500).send({ status: false, message: 'Server Error' });
    }

};

exports.updateMainBannerByStaus = async (req, res) => {
    console.log('productCategoryName', req.body);
    try {
        const mainBannerId = req.params.id;
        const mainBanner = await MainBanner.findByIdAndUpdate(mainBannerId, { $set: { status: req?.body?.status } }, { new: true }).exec();
        if (!mainBanner) {
            return res.status(404).send({ status: false, message: 'Main Banner not found' });
        }
        res.status(200).send({ status: true, message: 'Main Banner Updated', data: mainBanner });
    } catch (err) {
        console.error("dada", err.message);
        res.status(500).send({ status: false, message: 'Server Error' });
    }

};

exports.deleteMainBannerById = async (req, res) => {
    try {
        await MainBanner.deleteOne({ _id: req.params.id });
        return res.status(200).send({ status: true, message: 'Main Banner Deleted successfully!' });
    } catch (error) {
        res.status(200).send({ status: false, message: 'Server Error' })
    }
};