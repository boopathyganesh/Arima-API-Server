const Review = require('../../models/customer/review');

exports.addReview = async (req, res) => {
    const userId = req.user.id;
    console.log('userId', userId);
    try {
        const reviewData = {
            ...req.body,
            user: userId
        };
        console.log('reviewData', reviewData);
        const coupon = await Review.create(reviewData);
        res.status(200).send({ status: true, message: 'Review Created Successfully.', data: coupon })
    } catch (err) {
        res.status(500).send({ status: false, message: err })
    }
};

exports.getAllReviews = async (req, res) => {
    try {
        const coupon = await Review.find().populate('user');
        res.status(200).send({ status: true, message: 'All Reviews.', data: coupon })
    } catch (err) {
        res.status(500).send({ status: false, message: err })
    }
};

exports.getReviewById = async (req, res) => {
    const couponId = req.params.id;
    try {
        const coupon = await Review.findById(couponId);
        res.status(200).send({ status: true, message: 'Review.', data: coupon })
    } catch (err) {
        res.status(500).send({ status: false, message: err })
    }
};

exports.updateReviewById = async (req, res) => {
    const couponId = req.params.id;
    const couponData = req.body;
    try {
        const coupon = await Review
            .findByIdAndUpdate(couponId, couponData, { new: true })
            .exec();

        if (!coupon) {
            return res.status(404).send({ status: false, message: 'Review not found' });
        };
        res.status(200).send({ status: true, message: 'All Coupons.', data: coupon })
    } catch (err) {
        console.log('errrr', err);
        res.status(500).send({ status: false, message: err })
    }
};

exports.deleteReviewById = async (req, res) => {
    const couponId = req.params.id;
    try {
        await Review.deleteOne({ _id: couponId });
        res.status(200).send({ status: true, message: 'Review Deleted successfully.' })
    } catch (err) {
        res.status(500).send({ status: false, message: err })
    }
};