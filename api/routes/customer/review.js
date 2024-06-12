const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');

const ReviewController = require("../../controllers/customer/review");


router.post('/', auth, ReviewController.addReview);

router.get('/', auth, ReviewController.getAllReviews);

router.get('/:id', auth, ReviewController.getReviewById);

router.put('/:id', auth, ReviewController.updateReviewById);

router.delete('/:id', auth, ReviewController.deleteReviewById);

module.exports = router;