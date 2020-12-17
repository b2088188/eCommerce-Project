import User from '../models/userModel.js';
import catchAsync from'../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import jwt from 'jsonwebtoken';
import {promisify} from 'util';

export const signup = catchAsync(async (req, res, next) => {
	const user = await User.create(req.body);
    createSendToken(user, 201, res);
})

function createSendToken(user, statusCode, res) {
	const token = signToken(user._id)
	user.password = undefined;
	res.status(statusCode).json({
		status: 'success',
		data: {
			token,
			user
		}
	})
}

function signToken(id) {
	return jwt.sign({id}, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN
	})
}

export const login = catchAsync(async (req, res, next) => {
	const {email, password} = req.body;
	if(!email || !password)
		return next(new AppError('Please provide email and password', 400));
	const user = await User.findOne({email}).select('+password');
	if(!user || !await user.comparePassword(password))
		return next(new AppError('Incorrect email or password', 401));
	createSendToken(user, 200, res);
})

export const protect = catchAsync(async (req, res, next) => {
	let token;
	if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
		[, token] = req.headers.authorization.split(' ');
	if(!token)
		return next(new AppError('You are not logged in. Please log in to get access', 401));
	const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
	const user = await User.findById(decoded.id);
	if(!user)
		return next(new AppError('The user belonging to this token does no longer exist', 401));
	req.user = user;
	next();
})