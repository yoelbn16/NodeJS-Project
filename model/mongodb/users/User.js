import mongoose from 'mongoose';
import Name from './Name.js';
import Image from '../Image.js';
import Address from '../Address.js';
import phoneRegex from '../../../utils/phoneRegex.js';

const UserSchema = new mongoose.Schema({
	name: Name,
	phone: {
		type: String,
		required: true,
		match: RegExp(phoneRegex),
	},
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true,
		match: RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/),
	},
	password: {
		type: String,
		required: true,
	},
	image: Image,
	address: Address,
	isBusiness: {
		type: Boolean,
		default: false,
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const User = mongoose.model('user', UserSchema);

export default User;
