import catchAsync from'../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import Product from '../models/productModel.js';

export const getAllProducts = catchAsync(async (req, res, next) => {
	const products = await Product.find();
	res.status(200).json({
		status: 'success',
		data: {
           products
		}
	})
})

export const getProduct = catchAsync(async (req, res, next) => {
	const product = await Product.findById(req.params.id);
	if(!product)
		return next(new AppError('No product found with that Id', 404));
	res.status(200).json({
		status: 'success',
		data: {
			product
		}
	})
})