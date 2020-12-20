import express from 'express';
const router = express.Router();
import {addOrderItem} from'../controller/orderController.js';
import {protect} from'../controller/authController.js';


router.use(protect);

router.route('/')
           .post(addOrderItem);


export default router;            