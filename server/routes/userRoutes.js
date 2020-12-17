import express from 'express';
const router = express.Router();
import {signup, login, protect} from'../controller/authController.js';
import {getUserProfile} from '../controller/userController.js';


//Public
router.post('/signup', signup);
router.post('/login', login);
           
//Private
router.use(protect);
router.get('/profile', getUserProfile);


export default router;            