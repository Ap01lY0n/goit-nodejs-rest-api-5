const express = require('express');
const { validateBody, authenticate, upload } = require('../../middlewares');
const { favoriteSchema } = require('../../models');
const { changeSubscription, getCurrent, changeAvatar } = require('../../controllers/users');
const { ctrlWrapper } = require('../../utils');

const usersRouter = express.Router();

usersRouter.patch('/', authenticate, validateBody(favoriteSchema), ctrlWrapper(changeSubscription));

usersRouter.get('/current', authenticate, ctrlWrapper(getCurrent));

usersRouter.patch(
	'/avatar',
	authenticate,
	upload.single('avatar'),
	ctrlWrapper(changeAvatar)
);

module.exports = usersRouter;
