import mongoose from 'mongoose';
import Tour from './tourModel';

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


const Review = mongoose.model('Review', reviewSchema);

export default Review;