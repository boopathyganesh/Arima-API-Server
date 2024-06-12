const Coupon = require('../../models/admin/coupon');

exports.createCoupon = async (req, res) => {
    try {
        const coupon = await Coupon.create(req.body);
        res.status(200).send({ status: true, message: 'Coupon Created Successfully.', data: coupon })
    } catch (err) {
        res.status(500).send({ status: false, message: err })
    }
};

exports.getAllCoupon = async (req, res) => {
    try {
        const coupon = await Coupon.find().populate('product_category').populate('shop_category');
        res.status(200).send({ status: true, message: 'All Coupons.', data: coupon })
    } catch (err) {
        res.status(500).send({ status: false, message: err })
    }
};

exports.getCouponById = async (req, res) => {
    const couponId = req.params.id;
    try {
        const coupon = await Coupon.findById(couponId).populate('product_category').populate('shop_category');
        res.status(200).send({ status: true, message: 'All Coupons.', data: coupon })
    } catch (err) {
        res.status(500).send({ status: false, message: err })
    }
};

exports.updateCouponById = async (req, res) => {
    const couponId = req.params.id;
    const couponData = req.body;
    try {
        const coupon = await Coupon
            .findByIdAndUpdate(couponId, couponData, { new: true })
            .exec();

        if (!coupon) {
            return res.status(404).send({ status: false, message: 'Coupon not found' });
        };
        res.status(200).send({ status: true, message: 'All Coupons.', data: coupon })
    } catch (err) {
        console.log('errrr', err);
        res.status(500).send({ status: false, message: err })
    }
};

exports.deleteCouponById = async (req, res) => {
    const couponId = req.params.id;
    try {
        await Coupon.deleteOne({ _id: couponId });
        res.status(200).send({ status: true, message: 'Coupon Deleted successfully.' })
    } catch (err) {
        res.status(500).send({ status: false, message: err })
    }
};