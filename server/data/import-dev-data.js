import fs from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import Order from '../models/orderModel.js';
dotenv.config({path: './config.env'});
const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD)
mongoose.connect(DB, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false
}).then(con => console.log(con.connections))

const port = process.env.PORT || 3000;

const users = JSON.parse(fs.readFileSync(`./server/data/users.json`, 'utf-8'));
const products = JSON.parse(fs.readFileSync(`./server/data/products.json`, 'utf-8'));


async function importData() {
	try {
	   await Product.create(products);
       await User.create(users, {validateBeforeSave: false});
       //await Order.create(Orders);
       console.log('Date successfully loaded!');
	}
	catch(err) {
	        console.log(err);       
	}
}

async function deleteData() {	
	try {
	await Product.deleteMany();
	await User.deleteMany();
	await Order.deleteMany();
	console.log('Date successfully deleted!');
	}
	catch(err) {		
	}
	process.exit();
}

if(process.argv[2] === '--import')
	importData();
if(process.argv[2] === '--delete')
	deleteData();

