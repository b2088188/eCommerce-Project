import express from 'express';
const router = express.Router();
import {getAllProducts, getProduct, createProduct, updateProduct, deleteProduct} from'../controller/productController.js';
import {protect, restrictTo} from '../controller/authController.js';

router.route('/')
           .get(getAllProducts)
           .post(protect, restrictTo('admin'), createProduct);

router.route('/:id')           
            .get(getProduct)
            .patch(protect, restrictTo('admin'), updateProduct)
            .delete(protect, restrictTo('admin'), deleteProduct)            

export default router;            