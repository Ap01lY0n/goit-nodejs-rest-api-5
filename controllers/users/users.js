const path = require('path');
const { User } = require('../../models');
const HttpError = require('../../utils/HttpError');
const { adjustingAvatar } = require('../../utils/adjustAvatar');
const { rename } = require('node:fs/promises');

const avatarsDir = path.resolve('public/avatars');

const getCurrent = async ({ user }, res) => {
	const { _id: id } = user;

	const currentUser = await User.findOne({ id });

	res.json({
		email: currentUser.email,
		subscription: currentUser.subscription,
	});
};

const changeSubscription = async (req, res, next) => {
  const { _id: user } = req.user;
  const userSubscription = await User.findByIdAndUpdate(user, req.body, {
    new: true,
  });

  if (!userSubscription) return next();

  const { email, subscription } = userSubscription;

  res.status(200).json({
    email,
    subscription,
  });
}

const updateAvatar = async (req, res, next) => {
  const { _id: user } = req.user;

  if (req.file === undefined)
    throw new HttpError(404, 'Image was not found, check form-data values');
  const { path: tempUpload, originalname } = req.file;

  const filename = `${user}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);
  await adjustingAvatar(tempUpload);
  await rename(tempUpload, resultUpload);

  const avatarURL = path.join('avatars', filename);

  await User.findByIdAndUpdate(user, { avatarURL });

  res.json({ avatarURL });
};

module.exports = {
  getCurrent,
  changeSubscription,
  updateAvatar,
};
