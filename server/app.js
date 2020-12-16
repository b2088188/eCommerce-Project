import express from'express';
import morgan from'morgan';

const app = express();

import productRouter from './routes/productRoutes.js';

if(process.env.NODE_ENV === 'development')
app.use(morgan('dev'));

app.use('/api/v1/products', productRouter);

export default app;