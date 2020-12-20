import catchAsync from'../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import Order from '../models/orderModel.js';

export const addOrderItem = catchAsync(async (req, res, next) => {
	console.log(order.body)
	const order = await Order.create({...req.body, user: req.user._id});
	// res.status(201).json({
	// 	status: 'success',
	// 	data: {
	// 		order
	// 	}
	// })
})