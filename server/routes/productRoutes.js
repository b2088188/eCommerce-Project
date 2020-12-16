import express from 'express';
const router = express.Router();
import {getAllProducts, getProduct} from'../controller/productController.js';


router.route('/')
           .get(getAllProducts)

router.route('/:id')           
            .get(getProduct)

export default router;            