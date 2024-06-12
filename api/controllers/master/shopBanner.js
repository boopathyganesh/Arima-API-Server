const ShopBanner = require('../../models/master/shopBanner');
const { filedetails } = require("../../helpers/multer");
console.log('shopIdControl');

exports.uploadShopBannerImage = async (req, res) => {
    try {
        if (req.file) {
            datalist = filedetails('shop_banner', req.file)
            return res.send({ status: true, data: datalist, message: 'File Uploaded.' });
        }
    } catch (error) {
        res.status(200).send({ status: false, message: error })
    }
};

exports.createShopBanner = async (req, res) => {
    try {
        const mainBanner = await ShopBanner.create(req.body)
        res.status(200).send({ status: true, message: 'Shop Banner Added', data: mainBanner })
    } catch (error) {
        res.status(500).send({ status: false, message: 'Server Error ' + error })
    }

};

exports.allShopBanner = async (req, res) => {
    try {
        const mainBannerData = await ShopBanner.find().sort({ createdAt: -1 }).populate('product_category').populate('shop_category').exec();
        res.status(200).send({ status: true, message: 'Shop Banner', data: mainBannerData });
    } catch (error) {
        res.status(500).send({ status: false, message: 'Internal Server Error', error: error.message });
    }
};

exports.GetShopBannerByShopId = async (req, res) => {
    console.log('Initial GetShopBannerByShopId');
    const shopId = req.params.id;
    console.log('shopId', shopId);
    try {
        const shopBannerData = await ShopBanner.find({ shop_category: shopId }).sort({ createdAt: -1 }).populate('product_category').populate('shop_category').exec();
        res.status(200).send({ status: true, message: 'Shop Banner By Shop Idssss', data: shopBannerData });
    } catch (error) {
        res.status(500).send({ status: false, message: 'Internal Server Error', error: error.message });
    }
};

exports.getShopBannerById = async (req, res) => {
    console.log('req');
    const mainBannerId = req.params.id;
    try {
        const mainBanner = await ShopBanner.findOne({ _id: mainBannerId }).populate('product_category').populate('shop_category').exec();
        res.status(200).send({ status: true, message: 'Shop Banner By Id', data: mainBanner })
    } catch (err) {
        res.status(500).send({ status: false, message: 'Server error', data: err })
    }
};

exports.updateShopBannerById = async (req, res) => {
    try {
        const shopBannerId = req.params.id;
        const shopBanner = await ShopBanner.findByIdAndUpdate(shopBannerId, req?.body?.data, { new: true }).exec();
        if (!shopBanner) {
            return res.status(404).send({ status: false, message: 'Shop Banner not found' });
        }
        res.status(200).send({ status: true, message: 'Shop Banner Updated', data: shopBanner });
    } catch (err) {
        console.error("dada", err.message);
        res.status(500).send({ status: false, message: 'Server Error' });
    }

};

exports.updateShopBannerByStaus = async (req, res) => {
    console.log('productCategoryName', req.body);
    try {
        const ShopBannerId = req.params.id;
        const shopBanner = await ShopBanner.findByIdAndUpdate(ShopBannerId, { $set: { status: req?.body?.status } }, { new: true }).exec();
        if (!shopBanner) {
            return res.status(404).send({ status: false, message: 'Shop Banner not found' });
        }
        res.status(200).send({ status: true, message: 'Shop Banner Updated', data: shopBanner });
    } catch (err) {
        console.error("dada", err.message);
        res.status(500).send({ status: false, message: 'Server Error' });
    }
};

exports.deleteShopBannerById = async (req, res) => {
    try {
        await ShopBanner.deleteOne({ _id: req.params.id });
        return res.status(200).send({ status: true, message: 'Shop Banner Deleted successfully!' });
    } catch (error) {
        res.status(200).send({ status: false, message: 'Server Error' })
    }
};