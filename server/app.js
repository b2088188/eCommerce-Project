import express from'express';
import morgan from'morgan';

const app = express();

import AppError from './utils/appError.js';
import productRouter from './routes/productRoutes.js';
import globalErrorHandler from './controller/errorController.js';

if(process.env.NODE_ENV === 'development')
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1/products', productRouter);

app.all('*', (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404));
})

app.use(globalErrorHandler);

export default app;