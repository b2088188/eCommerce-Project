import express from 'express';
const router = express.Router({mergeParams: true});
import { protect, restrictTo } from '../controller/authController.js'
import {createReview, getReviews} from '../controller/reviewController.js';

router.use(protect)

router.route('/')
			.get(getReviews)
 			.post(restrictTo('user'), createReview)




export default router;            