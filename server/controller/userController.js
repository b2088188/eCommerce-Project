import User from '../models/userModel.js';
import Order from '../models/orderModel.js';
import catchAsync from'../utils/catchAsync.js';
import AppError from '../utils/appError.js';

export const getUserProfile = catchAsync(async (req, res, next) => {
    let user = await User.findById(req.user._id).select('-__v -role');
    if(!user)
        return next(new AppError('No user found with that Id', 404));
	return res.status(200).json({
		status: 'success',
		data: {
			user
		}
	})
})

export const updateUserProfile = catchAsync(async (req, res, next) => {
    if(req.body.password || req.body.passwordConfirm)
    	return next(new AppError('This route is not for password updates. Please use /updateMyPassword', 400));
    let filteredBody = filterObj(req.body, 'name', 'email');
    let user = await User.findByIdAndUpdate(req.user._id, filteredBody, {new: true, runValidators: true});
    res.status(200).json({
    	status: 'success',
    	data: {
    		user
    	}
    })
});

const filterObj = (obj, ...allowedFields) => {
   return Object.keys(obj).reduce((acc, cur) => {
     if(allowedFields.includes(cur))
     	return {...acc, [cur]: obj[cur]};
     return acc;
   }, {});
}


export const getUserOrder = catchAsync(async (req, res, next) => {
  const orders = await Order.find({user: req.user._id});
  if(!orders)
    return next(new AppError('No orders found with this Id', 404));
  res.status(200).json({
    status: 'success',
    data: {
        orders
    }
  })
})