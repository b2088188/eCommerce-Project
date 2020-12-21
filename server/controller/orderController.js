import catchAsync from'../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import Order from '../models/orderModel.js';

export const addOrderItem = catchAsync(async (req, res, next) => {
	const order = await Order.create({...req.body, user: req.user._id});
	res.status(201).json({
		status: 'success',
		data: {
			order
		}
	})
})


export const getOrder = catchAsync(async (req, res, next) => {
	const order = await Order.findById(req.params.id);
	if(!order)
		return next(new AppError('No Order found with that Id', 404));
	res.status(200).json({
		status: 'success',
		data: {
			order
		}
	})
})

export const updateOrderToPaid = catchAsync(async (req, res, next) => {
	const order = await Order.findById(req.params.id)
	if(order)
		order.processOrder(req.body);
	const updatedOrder = await order.save();
	res.status(200).json({
		status: 'success',
		data: {
			order: updatedOrder
		}
	})
})