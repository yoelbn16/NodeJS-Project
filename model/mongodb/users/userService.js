import User from './User.js';

const createUser = (userData) => {
	let user = new User(userData);
	return user.save();
};

const getAllUsers = () => {
	return User.find({}, { password: 0 });
};

const getUserById = (id) => {
	return User.findById(id, { password: 0 });
};

const getUserByEmail = (email) => {
	return User.findOne({ email });
};

const updateUser = (id, userData) => {
	return User.findByIdAndUpdate(id, userData, { new: true });
};

const patchIsBiz = (id, isBusiness) => {
	return User.updateOne({ _id: id }, { isBusiness: isBusiness });
};

const deleteUser = (id) => {
	return User.findByIdAndDelete(id);
};

export { createUser, getAllUsers, getUserById, updateUser, patchIsBiz, deleteUser, getUserByEmail };
