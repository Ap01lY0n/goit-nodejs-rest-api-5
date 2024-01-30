const path = require('path');
const { User } = require('../../models');
const { HttpError } = require('../../utils/HttpError');
const { adjustingAvatar } = require('../../utils/adjustAvatar')
const { rename } = require('node:fs/promises');

const changeSubscription = async ({ user, body }, res) => {
	const { _id: id } = user;
	const { subscription } = body;

	const currentUser = subscription
		? await User.findByIdAndUpdate(id, { subscription }, { new: true })
		: user;

	res.json({
		email: currentUser.email,
		subscription: currentUser.subscription,
	});
};

const getCurrent = async ({ user }, res) => {
	const { _id: id } = user;

	const currentUser = await User.findOne({ id });

	res.json({
		email: currentUser.email,
		subscription: currentUser.subscription,
	});
};
const avatarsDir = path.resolve('public/avatars');
const updateAvatar = async (req, res, next) => {
	const { _id: user } = req.user;
	try{
		if (req.file === undefined)
		throw HttpError(404, 'Image was not found, check form-data values');
		const { path: tempUpload, originalname } = req.file;
		
		const filename = `${user}_${originalname}`;
		const resultUpload = path.join(avatarsDir, filename);
		await adjustingAvatar(tempUpload);
		await rename(tempUpload, resultUpload);
		
		const avatarURL = path.join('avatars', filename);
		
		await User.findByIdAndUpdate(user, { avatarURL });
		
		res.json({ avatarURL });
		}catch (error) {
			console.error('Error in updateAvatar:', error);
			next(HttpError(500, 'Internal Server Error'));
		  }
};

module.exports = {
	changeSubscription,
	getCurrent,
	updateAvatar,
};
