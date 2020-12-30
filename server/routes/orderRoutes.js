import express from 'express';
const router = express.Router();

import {addOrderItem, getAllOrders, getOrder, updateOrderToPaid, updateOrderToDelivered} from'../controller/orderController.js';
import {protect, restrictTo} from'../controller/authController.js';



router.use(protect);
router.route('/')
           .post(addOrderItem)
           .get(restrictTo('admin'), getAllOrders);
router.route('/:id')          
            .get(getOrder);  
router.route('/pay/:id')            
            .patch(updateOrderToPaid)
router.route('/deliver/:id')            
            .patch(restrictTo('admin'), updateOrderToDelivered)



export default router;            