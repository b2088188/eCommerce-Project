import User from '../models/userModel.js';
import catchAsync from'../utils/catchAsync.js';
import AppError from '../utils/appError.js';

export const getUserProfile = catchAsync(async (req, res, next) => {
	return res.status(200).json({
		status: 'success',
		data: {
			user: req.user
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
