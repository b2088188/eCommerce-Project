import Review from '../models/reviewModel.js';
import catchAsync from'../utils/catchAsync.js';
import AppError from '../utils/appError.js';

export const createReview = catchAsync(async (req, res, next) => {
	const review = await Review.create({user: req.user._id, product: req.params.productId, ...req.body});
	res.status(201).json({
		status: 'success',
		data: {
			review
		}
	})
})

export const getReviews = catchAsync(async (req, res, next) => {
	const reviews = await Review.find({product: req.params.productId});
	res.status(200).json({
		status: 'success',
		data: {
			reviews
		}
	})
})