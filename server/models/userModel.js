import mongoose from 'mongooese';
import validator from 'validator';

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please provide your name']
	},
	email: {
		type: String,
		required: [true, 'Please provide your email'],
		unique: true,
		lowercase: true,
		validate: [validator.isEmail, 'Please provide a valid email']
	},
	password: {
		type: String,
		required: [true, 'Please provide a password'],
		minlength: 8,
		select: false
	},
	passwordConfirm: {
       type: String,
       required: [true, 'Please confirm your password'],
       validate: {
       	validator: function (el) {
       		return el === this.password;
       	},
       	message: 'Passwords are not the same'
       }
	},
	role: {
		type: String,
		enum: ['user', 'admin'],
		default: 'user'
	}
})

const User = mongoose.model('User', userSchema);

export default User;