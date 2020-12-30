import express from'express';
import morgan from'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';

const app = express();

import AppError from './utils/appError.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import reviewRouter from './routes/reviewRoutes.js';
import globalErrorHandler from './controller/errorController.js';

if(process.env.NODE_ENV === 'development')
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'server/public')))

app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/reviews', reviewRouter);

app.get('/api/v1/config/paypal', (req, res) => res.status(200).json({
	status: 'success',
	data: {
		clientId: process.env.PAYPAL_CLIENT_ID
	}
}))

app.all('*', (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404));
})

app.use(globalErrorHandler);

export default app;