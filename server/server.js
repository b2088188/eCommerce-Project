import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({path: './config.env'});
import app from './app.js';

const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log(`App running at port: ${port}, mode: ${process.env.NODE_ENV}`)
})