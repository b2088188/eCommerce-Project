const catchAsync = require('../utils/catchAsync');
const products = require('../data/products');

exports.getAllProducts = catchAsync(async (req, res, next) => {
	res.status(200).json({
		status: 'success',
		data: {
           products
		}
	})
})

exports.getProduct = catchAsync(async (req, res, next) => {
	const product = products.find(el => el._id === req.params.id)
	res.status(200).json({
		status: 'success',
		data: {
			product
		}
	})
})