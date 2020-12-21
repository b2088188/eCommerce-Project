import express from 'express';
const router = express.Router();
import {addOrderItem, getOrder, updateOrderToPaid} from'../controller/orderController.js';
import {protect} from'../controller/authController.js';


router.use(protect);
router.route('/')
           .post(addOrderItem);
router.route('/:id')          
            .get(getOrder);  
router.route('/:id/pay')            
            .post(updateOrderToPaid)


export default router;            