import User from '../models/userModel.js';
import catchAsync from'../utils/catchAsync.js';
import AppError from '../utils/appError.js';

export const getUserProfile = catchAsync(async (req, res, next) => {
	return res.status(200).json({
		status: 'success',
		data: {
			user: req.user
		}
	})
})
