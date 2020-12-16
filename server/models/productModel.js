import mongoose from 'mongooese';
import validator from 'validator';

const productSchema = new mongoose.Schema({
	user: {
       type: mongoose.Schema.ObjectId,
       ref: 'User',
       required: [true, 'Please provide a user']
	},
	image: {
		type: String,
		required: [true, 'Please provide an image']
	},
	brand: {
		type: String,
		required: [true, 'Please provide a product brand']
	},
	category: {
		type: String,
		required: [true, 'Please provide a category']
	},
	description: {
       type: String,
       required: [true, 'Please confirm your password'],
	},
	ratingsAverage: {
		type: Number,
		min: [1, 'Rating must be above 1.0'],
		max: [5, 'Ratings must be below 5.0'],
		default: 3.5
	},
	ratingsQuantity: {
		type: Number,
		default: 0
	},
	price: {
		type: Number,
		required: [true, 'Please provide the price']
	},
	countInStock: {
		type: Number,
		required: [true, 'Please provide the amount of stock'],
		default: 0
	}
})

const Product = mongoose.model('Product', productSchema);

export default Product;