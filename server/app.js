import express from'express';
import morgan from'morgan';
import cookieParser from 'cookie-parser';

const app = express();

import AppError from './utils/appError.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import globalErrorHandler from './controller/errorController.js';

if(process.env.NODE_ENV === 'development')
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/orders', orderRouter);

app.all('*', (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404));
})

app.use(globalErrorHandler);

export default app;