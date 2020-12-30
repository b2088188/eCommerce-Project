import multer from 'multer';
import sharp from 'sharp';
import * as R from 'ramda';
import catchAsync from'../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import Product from '../models/productModel.js';

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
	if(file.mimetype.startsWith('image'))
		return cb(null, true);
	cb(new AppError('Not an image, only allowing to upload an image', 400), false);
}

const upload = multer({
	storage: multerStorage,
	fileFilter: multerFilter
})

export const uploadProductImage = upload.single('image');

export const resizeProductImage = catchAsync(async (req, res, next) => {
	if(!req.file)
		return next();
	req.file.filename = `product-${Date.now()}.jpeg`;
	await sharp(req.file.buffer).resize(500, 500).toFormat('jpeg').jpeg({quality: 90}).toFile(`server/public/images/products/${req.file.filename}`);
	next();
})

export const getAllProducts = catchAsync(async (req, res, next) => {
	let queryObj = R.omit(['page', 'sort', 'limit', 'fields', 'name'], req.query);
	let products;
	//Query by name
	let queryName = req.query.name ? {name: {$regex: `${req.query.name}`, $options: 'i'}} : {}
	let query = Product.find({...queryObj, ...queryName})
	 //Pagination
	 const page = +req.query.page || 1;
	 const limit = +req.query.limit || 100;
	 const skip = (page - 1) * limit;
	 query.skip(skip).limit(limit);
	 if(req.query.page)
	 {
	 	const numProducts = await Product.countDocuments();
	 	if(skip > numProducts)
	 		throw new Error('This page does not exist');
	 }
	 products = await query;

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

export const createProduct = catchAsync(async (req, res, next) => {
	const product = await Product.create(req.body);	
	res.status(201).json({
		status: 'success',
		data: {
			product
		}
	})
})

export const updateProduct = catchAsync(async (req, res, next) => {
	if(req.file)
		req.body.image = req.file.filename;
	const product = await Product.findByIdAndUpdate(req.params.id, req.body)
	if(!product)
		return next(new AppError('No product found with that Id', 404));
	res.status(200).json({
		status: 'success',
		data: {
			product
		}
	})
})



export const deleteProduct = catchAsync(async (req, res, next) => {
	const product = await Product.findByIdAndDelete(req.params.id);
	if(!product)
		return next(new AppError('No product found with that Id', 404));
	res.status(200).json({
		status: 'success'
	})
})