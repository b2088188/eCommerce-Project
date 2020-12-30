import express from 'express';
const router = express.Router();
import reviewRouter from './reviewRoutes.js';
import {getAllProducts, getProduct, createProduct, updateProduct, uploadProductImage, resizeProductImage, deleteProduct} from'../controller/productController.js';
import {protect, restrictTo} from '../controller/authController.js';


router.use('/:productId/reviews', reviewRouter);

router.route('/')
           .get(getAllProducts)
           .post(protect, restrictTo('admin'), createProduct);

router.route('/:id')           
            .get(getProduct)
            .patch(protect, restrictTo('admin'), uploadProductImage, resizeProductImage, updateProduct)
            .delete(protect, restrictTo('admin'), deleteProduct)            

export default router;            