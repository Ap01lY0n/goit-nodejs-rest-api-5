const express = require('express');
const { validateBody, authenticate } = require('../../middlewares');
const { favoriteSchema, updateAvatarSchema } = require('../../models');
const { changeSubscription, getCurrent, updateAvatar } = require('../../controllers/users');
const { ctrlWrapper } = require('../../utils');
const { upload } = require('../../middlewares/upload');

const usersRouter = express.Router();
const wrappedUpdateAvatar = ctrlWrapper(updateAvatar);

usersRouter.patch('/', authenticate, validateBody(favoriteSchema), ctrlWrapper(changeSubscription));

usersRouter.get('/current', authenticate, ctrlWrapper(getCurrent));

usersRouter.patch(
    '/avatars',
    authenticate,
    validateBody(updateAvatarSchema),
    upload.single('avatar'),
    wrappedUpdateAvatar,
  );

module.exports = usersRouter;
