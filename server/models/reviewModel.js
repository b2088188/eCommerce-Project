import mongoose from 'mongoose';
import Product from '../models/productModel.js';

const reviewSchema = new mongoose.Schema({
	review: {
		type: String,
		required: [true, 'Review can not be empty']
	},
	rating: {
		type: Number,
		required: [true, 'Rating can not be empty'],
		min: [1, 'Rating must be above 1.0'],
        max: [5, 'Ratings must be below 5.0']
	},
	createdAt: {
        type: Date,
        default: Date.now(),
        selected: false
    },
    user: {
    	type: mongoose.Schema.ObjectId,
    	ref: 'User',
    	required: [true, 'Review must belong to a user']
    },
    product: {
    	type: mongoose.Schema.ObjectId,
    	ref: 'Product',
    	required: [true, 'Review must belong to a product']
    }    
})

reviewSchema.index({tour: 1, user: 1}, {unique: true});

reviewSchema.statics.calcAverageRatings = async function (productId) {
	const stats = await this.aggregate([
		{$match: {product: productId}},
		{
			$group: {
				_id: '$product',
				nRating: {$sum: 1},
				avgRating: {$avg: '$rating'}
			}
		}
		]);
		await Product.findByIdAndUpdate(productId, {
			ratingsQuantity: stats[0].nRating,
			ratingsAverage: stats[0].avgRating
		})
}

reviewSchema.post('save', function () {
	this.constructor.calcAverageRatings(this.product);
})

const Review = mongoose.model('Review', reviewSchema);

export default Review;