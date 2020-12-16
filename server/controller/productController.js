import catchAsync from'../utils/catchAsync.js';
import products from '../data/products.js';

export const getAllProducts = catchAsync(async (req, res, next) => {
	res.status(200).json({
		status: 'success',
		data: {
           products
		}
	})
})

export const getProduct = catchAsync(async (req, res, next) => {
	const product = products.find(el => el._id === req.params.id)
	res.status(200).json({
		status: 'success',
		data: {
			product
		}
	})
})