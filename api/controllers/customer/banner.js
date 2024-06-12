
const Banner = require('../../models/customer/banner');

exports.getAllBanners = async (req, res) => {
    try {
        const banner = await Banner.find();
        res.status(200).send({ status: "true", message: 'All Customer Banners', data: banner })
    } catch (err) {
        res.status(200).send({ status: "false", message: 'Error in Solving', data: err })
    }
};
