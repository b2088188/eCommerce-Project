import express from 'express';
const router = express.Router();
import {signup, login, protect, restrictTo} from'../controller/authController.js';
import {getUserProfile, updateUserProfile, getUserOrder, getAllUsers, deleteUser} from '../controller/userController.js';


//Public
router.post('/signup', signup);
router.post('/login', login);
           
//Private
router.use(protect);
router.route('/profile')
            .get(getUserProfile)
            .patch(updateUserProfile)
router.route('/myorders')
            .get(getUserOrder)

router.use(restrictTo('admin'));
router.route('/')            
           .get(getAllUsers)
router.route('/:id')           
            .delete(deleteUser)

export default router;            